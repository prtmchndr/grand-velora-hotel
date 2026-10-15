import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    // Pastikan pengguna memiliki sesi admin yang valid.
    const session = await verifyAdminSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Silakan login sebagai admin.",
        },
        { status: 401 }
      );
    }

    const [reservationRows] = await pool.query(`
      SELECT
        COUNT(DISTINCT ref_no) AS totalReservations,
        COUNT(DISTINCT CASE
          WHEN status = 0 THEN ref_no
        END) AS pendingReservations,
        COUNT(DISTINCT CASE
          WHEN status = 1 THEN ref_no
        END) AS checkedInReservations
      FROM checked
    `);

    const [roomRows] = await pool.query(`
      SELECT
        COUNT(*) AS totalRooms,
        SUM(
          CASE
            WHEN r.status = 0
              AND NOT EXISTS (
                SELECT 1
                FROM checked c
                WHERE c.room_id = r.id
                  AND c.status IN (0, 1)
                  AND c.date_in <= NOW()
                  AND c.date_out > NOW()
              )
            THEN 1
            ELSE 0
          END
        ) AS availableRooms
      FROM rooms r
    `);

    const [guestRows] = await pool.query(`
      SELECT COUNT(DISTINCT contact_no) AS totalGuests
      FROM checked
      WHERE contact_no IS NOT NULL
        AND contact_no <> ''
    `);

    const reservations = (reservationRows as any[])[0];
    const rooms = (roomRows as any[])[0];
    const guests = (guestRows as any[])[0];

    return NextResponse.json({
      success: true,
      stats: {
        totalReservations: Number(reservations.totalReservations ?? 0),
        pendingReservations: Number(reservations.pendingReservations ?? 0),
        checkedInReservations: Number(reservations.checkedInReservations ?? 0),
        totalRooms: Number(rooms.totalRooms ?? 0),
        availableRooms: Number(rooms.availableRooms ?? 0),
        totalGuests: Number(guests.totalGuests ?? 0),
      },
    });
  } catch (error) {
    console.error("Dashboard statistics error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load dashboard statistics.",
      },
      { status: 500 }
    );
  }
}