import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { checkin, checkout, rooms } = body;

    // Validasi format tanggal dan jumlah kamar
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (
      typeof checkin !== "string" ||
      typeof checkout !== "string" ||
      !datePattern.test(checkin) ||
      !datePattern.test(checkout)
    ) {
      return NextResponse.json(
        { success: false, message: "Format tanggal tidak valid." },
        { status: 400 }
      );
    }

    if (
      !Number.isInteger(rooms) ||
      rooms < 1 ||
      rooms > 10
    ) {
      return NextResponse.json(
        { success: false, message: "Jumlah kamar harus 1–10." },
        { status: 400 }
      );
    }

    // Validasi tanggal sebenarnya dan urutannya
    const checkinDate = new Date(`${checkin}T00:00:00Z`);
    const checkoutDate = new Date(`${checkout}T00:00:00Z`);

    if (
      Number.isNaN(checkinDate.getTime()) ||
      Number.isNaN(checkoutDate.getTime()) ||
      checkinDate.toISOString().slice(0, 10) !== checkin ||
      checkoutDate.toISOString().slice(0, 10) !== checkout ||
      checkout <= checkin
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Tanggal check-out harus setelah check-in.",
        },
        { status: 400 }
      );
    }

    // Hitung kamar yang tersedia pada rentang tanggal tersebut
    const [rows] = await pool.execute(
      `SELECT COUNT(*) AS availableRooms
       FROM rooms r
       WHERE r.status = 0
         AND NOT EXISTS (
           SELECT 1
           FROM checked c
           WHERE c.room_id = r.id
             AND c.status IN (0, 1)
             AND c.date_in < ?
             AND c.date_out > ?
         )`,
      [`${checkout} 00:00:00`, `${checkin} 00:00:00`]
    );

    const availableRooms = Number(
      (rows as { availableRooms: number }[])[0].availableRooms
    );

    return NextResponse.json({
      success: true,
      available: availableRooms >= rooms,
      requestedRooms: rooms,
      availableRooms,
      message:
        availableRooms >= rooms
          ? "Kamar tersedia untuk tanggal yang dipilih."
          : "Kamar tidak mencukupi untuk tanggal yang dipilih.",
    });
  } catch (error) {
    console.error("Availability API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat memeriksa ketersediaan kamar.",
      },
      { status: 500 }
    );
  }
}