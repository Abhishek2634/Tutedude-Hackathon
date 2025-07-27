import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  // Expire the cookie by setting maxAge to -1
  const serialized = serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1,
    path: '/',
  });

  const response = NextResponse.json({ success: true, message: "Logged out successfully" });
  response.headers.set('Set-Cookie', serialized);
  
  return response;
}
