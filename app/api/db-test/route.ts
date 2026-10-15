import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const connection = await pool.getConnection();

    try {
      const [rows] = await connection.query(
        "SELECT DATABASE() AS database_name"
      );

      return NextResponse.json({
        success: true,
        message: "Koneksi database berhasil!",
        data: rows,
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Database connection error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Koneksi database gagal. Periksa konfigurasi MySQL.",
      },
      { status: 500 }
    );
  }
}