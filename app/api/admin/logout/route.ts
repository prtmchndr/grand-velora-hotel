import { NextResponse } from "next/server";
import { deleteAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST() {
  try {
    await deleteAdminSession();

    return NextResponse.json({
      success: true,
      message: "Logout berhasil.",
    });
  } catch (error) {
    console.error("Admin logout error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal melakukan logout.",
      },
      { status: 500 }
    );
  }
}