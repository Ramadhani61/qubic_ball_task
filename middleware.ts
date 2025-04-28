import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose'; // Ganti import jwt dari jose

const JWT_SECRET = process.env.JWT_SECRET || 'qubicball@2025!'; // Sesuaikan dengan .env

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log(req, "Res");

  // Bypass middleware untuk halaman login atau API login
  if (pathname === '/' || pathname.startsWith('/api/login')) {
    return NextResponse.next();
  }

  // Ambil token dari cookies
  const token = req.cookies.get('token')?.value;
  console.log(token, "token");

  if (!token) {
    // Kalau tidak ada token, redirect ke login
    const loginUrl = new URL('/', req.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Verifikasi token menggunakan jose
    const secret = new TextEncoder().encode(JWT_SECRET);
    await jwtVerify(token, secret);

    // Token valid, lanjut akses
    return NextResponse.next();
  } catch (error) {
    console.error('Invalid Token or Token Expired:', error);

    // Kalau token tidak valid atau expired, redirect ke login
    const loginUrl = new URL('/', req.url);
    return NextResponse.redirect(loginUrl);
  }
}

// Tentukan halaman mana saja yang akan dilindungi middleware
export const config = {
  matcher: ['/dashboard/:path*', '/dashboard', '/user/:path*'],
};
