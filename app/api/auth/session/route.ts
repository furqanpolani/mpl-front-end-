import { NextRequest, NextResponse } from 'next/server';

const BACKEND = 'http://localhost:3001';

export async function GET(req: NextRequest) {
  const cookie = req.headers.get('cookie') ?? '';

  const backendRes = await fetch(`${BACKEND}/api/auth/session`, {
    headers: { cookie },
  });

  if (!backendRes.ok) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await backendRes.json();
  return NextResponse.json(data);
}
