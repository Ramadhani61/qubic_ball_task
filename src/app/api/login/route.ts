import { NextResponse } from 'next/server';
import { SignJWT } from 'jose'; // pakai jose

// Mock credentials
const USERNAME = 'testuser';
const PASSWORD = 'testpass';

// Secret untuk JWT
const JWT_SECRET = process.env.JWT_SECRET || 'qubicball@2025!';
const JWT_EXPIRES_IN = 60 * 60; // 1 jam dalam detik

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (username === USERNAME && password === PASSWORD) {
    // Generate JWT token pakai jose
    const secret = new TextEncoder().encode(JWT_SECRET);
    const token = await new SignJWT({ username })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(`${JWT_EXPIRES_IN}s`) // s = seconds
      .sign(secret);

    // Simpan token ke cookies
    const response = NextResponse.json({ message: 'Login success' });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', // ← jangan kebalik
      path: '/',
      sameSite: 'strict',
      maxAge: JWT_EXPIRES_IN,
    });

    return response;
  } else {
    return NextResponse.json({ message: 'Username Atau Password Salah' }, { status: 401 });
  }
}
