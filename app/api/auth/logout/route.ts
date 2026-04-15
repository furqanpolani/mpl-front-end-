import { NextRequest, NextResponse } from 'next/server';

const BACKEND = 'http://localhost:3001';

export async function POST(req: NextRequest) {
  const cookie = req.headers.get('cookie') ?? '';

  await fetch(`${BACKEND}/api/auth/logout`, {
    method: 'POST',
    headers: { cookie },
  });

  const response = NextResponse.json({ message: 'Logged out' });
  response.cookies.delete('mpl_token');
  return response;
}
