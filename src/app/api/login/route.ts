import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Mock credentials
const USERNAME = 'testuser';
const PASSWORD = 'testpass';

// Secret untuk JWT
const JWT_SECRET = process.env.JWT_SECRET || 'qubicball@2025!';
const JWT_EXPIRES_IN = '1h'; // expire 1 jam

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (username === USERNAME && password === PASSWORD) {
    // Generate JWT token
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Simpan token ke cookies
    const response = NextResponse.json({ message: 'Login success' });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'development',
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 jam
    });

    return response;
  } else {
    return NextResponse.json({ message: 'Username Atau Password Salah' }, { status: 401 });
  }
}
