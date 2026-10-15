import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyAdminSession } from "@/lib/admin-auth";
import type {
  RowDataPacket,
  ResultSetHeader,
} from "mysql2";

export const runtime = "nodejs";

interface ReservationRow extends RowDataPacket {
  id: number;
  ref_no: string;
  room_id: number;
  name: string;
  contact_no: string;
  date_in: string | Date;
  date_out: string | Date;
  status: number;
  date_updated: string | Date;
}

interface StatusRow extends RowDataPacket {
  status: number;
}

// Mengambil seluruh data reservasi
export async function GET() {
  try {
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

    const [rows] = await pool.query<ReservationRow[]>(`
      SELECT
        id,
        ref_no,
        room_id,
        name,
        contact_no,
        date_in,
        date_out,
        status,
        date_updated
      FROM checked
      ORDER BY date_updated DESC, id DESC
    `);

    return NextResponse.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("GET admin reservations error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data reservasi.",
      },
      { status: 500 }
    );
  }
}

// Memperbarui status semua kamar dalam satu reservasi
export async function PATCH(request: NextRequest) {
  let connection;
  let transactionStarted = false;

  try {
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

    const body = await request.json();
    const refNo = String(body.refNo ?? "").trim();
    const status = Number(body.status);

    if (
      !refNo ||
      !Number.isInteger(status) ||
      ![1, 2].includes(status)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Nomor referensi atau status tidak valid.",
        },
        { status: 400 }
      );
    }

    connection = await pool.getConnection();
    await connection.beginTransaction();
    transactionStarted = true;

    // Kunci baris reservasi agar tidak terjadi perubahan
    // bersamaan saat status sedang diperiksa.
    const [rows] = await connection.execute<StatusRow[]>(
      `SELECT status
       FROM checked
       WHERE ref_no = ?
       FOR UPDATE`,
      [refNo]
    );

    if (rows.length === 0) {
      await connection.rollback();
      transactionStarted = false;

      return NextResponse.json(
        {
          success: false,
          message: "Reservasi tidak ditemukan.",
        },
        { status: 404 }
      );
    }

    // Pastikan semua kamar dalam satu referensi
    // memiliki status yang konsisten.
    const currentStatuses = [
      ...new Set(rows.map((row) => Number(row.status))),
    ];

    if (currentStatuses.length !== 1) {
      await connection.rollback();
      transactionStarted = false;

      return NextResponse.json(
        {
          success: false,
          message:
            "Status kamar dalam reservasi tidak konsisten. Periksa data reservasi terlebih dahulu.",
        },
        { status: 409 }
      );
    }

    const currentStatus = currentStatuses[0];

    // Hanya izinkan Pending -> Checked-in
    // dan Checked-in -> Checked-out.
    const allowedNextStatus: Record<number, number> = {
      0: 1,
      1: 2,
    };

    if (allowedNextStatus[currentStatus] !== status) {
      await connection.rollback();
      transactionStarted = false;

      return NextResponse.json(
        {
          success: false,
          message:
            currentStatus === 2
              ? "Reservasi sudah selesai dan tidak dapat diubah kembali."
              : currentStatus === 0
                ? "Reservasi Pending hanya dapat diubah menjadi Checked-in."
                : "Reservasi Checked-in hanya dapat diubah menjadi Checked-out.",
        },
        { status: 409 }
      );
    }

    const [result] =
      await connection.execute<ResultSetHeader>(
        `UPDATE checked
         SET status = ?, date_updated = NOW()
         WHERE ref_no = ?`,
        [status, refNo]
      );

    if (result.affectedRows === 0) {
      await connection.rollback();
      transactionStarted = false;

      return NextResponse.json(
        {
          success: false,
          message: "Tidak ada data reservasi yang diperbarui.",
        },
        { status: 409 }
      );
    }

    await connection.commit();
    transactionStarted = false;

    return NextResponse.json({
      success: true,
      message: "Status reservasi berhasil diperbarui.",
    });
  } catch (error) {
    if (connection && transactionStarted) {
      try {
        await connection.rollback();
      } catch (rollbackError) {
        console.error("Reservation rollback error:", rollbackError);
      }
    }

    console.error("PATCH admin reservations error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal memperbarui status reservasi.",
      },
      { status: 500 }
    );
  } finally {
    connection?.release();
  }
}