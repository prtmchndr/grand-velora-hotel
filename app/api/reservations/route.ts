import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import pool from "@/lib/db";

export async function POST(request: NextRequest) {
  let connection;

  try {
    const body = await request.json();

    const name =
      typeof body.name === "string" ? body.name.trim() : "";
    const contactNo =
      typeof body.contactNo === "string"
        ? body.contactNo.trim()
        : "";
    const checkin =
      typeof body.checkin === "string" ? body.checkin : "";
    const checkout =
      typeof body.checkout === "string" ? body.checkout : "";
    const rooms = Number(body.rooms);

    // Validate guest information
    if (!name || name.length > 200) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid guest name." },
        { status: 400 }
      );
    }

    if (!/^[+0-9().\-\s]{7,20}$/.test(contactNo)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid contact number." },
        { status: 400 }
      );
    }

    // Validate dates
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (!datePattern.test(checkin) || !datePattern.test(checkout)) {
      return NextResponse.json(
        { success: false, message: "Invalid date format." },
        { status: 400 }
      );
    }

    const validDate = (value: string) => {
      const date = new Date(`${value}T00:00:00.000Z`);
      return (
        !Number.isNaN(date.getTime()) &&
        date.toISOString().slice(0, 10) === value
      );
    };

    if (
      !validDate(checkin) ||
      !validDate(checkout) ||
      checkout <= checkin
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Check-out must be after check-in.",
        },
        { status: 400 }
      );
    }

    if (!Number.isInteger(rooms) || rooms < 1 || rooms > 4) {
      return NextResponse.json(
        { success: false, message: "Select between 1 and 4 rooms." },
        { status: 400 }
      );
    }

    // Start transaction so room allocation and booking inserts
    // succeed or fail together.
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // Lock candidate room rows and exclude rooms with overlapping
    // pending or checked-in reservations.
    const [roomRows] = await connection.execute(
      `SELECT r.id
       FROM rooms r
       WHERE r.status = 0
         AND NOT EXISTS (
           SELECT 1
           FROM checked c
           WHERE c.room_id = r.id
             AND c.status IN (0, 1)
             AND DATE(c.date_in) < ?
             AND DATE(c.date_out) > ?
         )
       ORDER BY r.id
       LIMIT ?
       FOR UPDATE`,
      [checkout, checkin, rooms]
    );

    const availableRooms = roomRows as { id: number }[];

    if (availableRooms.length < rooms) {
      await connection.rollback();

      return NextResponse.json(
        {
          success: false,
          message:
            "Sorry, there are not enough available rooms for those dates. Please check availability again.",
        },
        { status: 409 }
      );
    }

    // One reference number groups the rooms in this booking.
    const referenceNo = `GV-${randomBytes(5)
      .toString("hex")
      .toUpperCase()}`;

    // The existing schema stores one room per checked row.
    // Use the existing pending status (0) and booked_cid (0).
    for (const room of availableRooms) {
      await connection.execute(
        `INSERT INTO checked
          (ref_no, room_id, name, contact_no,
           date_in, date_out, booked_cid, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          referenceNo,
          room.id,
          name,
          contactNo,
          `${checkin} 14:00:00`,
          `${checkout} 11:00:00`,
          0,
          0,
        ]
      );
    }

    await connection.commit();

    return NextResponse.json(
      {
        success: true,
        message: "Your reservation has been saved successfully.",
        referenceNo,
        guestName: name,
        checkin,
        checkout,
        roomsBooked: availableRooms.length,
        status: "pending",
      },
      { status: 201 }
    );
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    console.error("Reservation API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to save the reservation. Please try again.",
      },
      { status: 500 }
    );
  } finally {
    connection?.release();
  }
}