import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'qubicball@2025!'; // Sesuaikan dengan .env

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log(req,"Res");
  
  
  // Bypass middleware untuk halaman login atau API login
  if (pathname.startsWith('/') || pathname.startsWith('/api/login')) {
    return NextResponse.next();
  }

  // Ambil token dari cookies
  const token = req.cookies.get('token')?.value;
  console.log(token,"token");
  

  if (!token) {
    // Kalau tidak ada token, redirect ke login
    const loginUrl = new URL('/', req.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Verifikasi token (bisa juga menangani expired token)
    jwt.verify(token, JWT_SECRET);

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
