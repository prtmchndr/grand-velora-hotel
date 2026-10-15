import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import type { RowDataPacket } from "mysql2";
import pool from "@/lib/db";
import { createAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";

type AdminUser = RowDataPacket & {
  id: number;
  name: string;
  username: string;
  password: string;
  type: number;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const username = String(body.username ?? "").trim();
    const password = String(body.password ?? "");

    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Username dan password wajib diisi.",
        },
        { status: 400 }
      );
    }

    if (username.length > 100 || password.length > 200) {
      return NextResponse.json(
        {
          success: false,
          message: "Username atau password tidak valid.",
        },
        { status: 400 }
      );
    }

    const [rows] = await pool.execute<AdminUser[]>(
      `SELECT id, name, username, password, type
       FROM users
       WHERE username = ?
       LIMIT 1`,
      [username]
    );

    const admin = rows[0];

    // Hanya akun admin (type = 1) yang boleh masuk.
    if (!admin || Number(admin.type) !== 1) {
      return NextResponse.json(
        {
          success: false,
          message: "Username atau password salah.",
        },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Username atau password salah.",
        },
        { status: 401 }
      );
    }

    // Membuat sesi JWT dan cookie melalui helper autentikasi.
    await createAdminSession(Number(admin.id));

    return NextResponse.json({
      success: true,
      message: "Login berhasil.",
      user: {
        id: admin.id,
        name: admin.name,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat login.",
      },
      { status: 500 }
    );
  }
}