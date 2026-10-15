import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "gv_admin_session";

async function isValidAdminSession(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!token || !secret || secret.length < 32) {
    return false;
  }

  try {
    const secretKey = new TextEncoder().encode(secret);

    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });

    return (
      payload.role === "admin" &&
      typeof payload.adminId === "number"
    );
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const validSession = await isValidAdminSession(request);

  if (!validSession) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/admin/reservations/:path*",
  ],
};