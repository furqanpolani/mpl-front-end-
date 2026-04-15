import { NextRequest, NextResponse } from 'next/server';

const BACKEND = 'http://localhost:3001';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const backendRes = await fetch(`${BACKEND}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(data, { status: backendRes.status });
  }

  // Forward the Set-Cookie header from the backend to the browser
  const response = NextResponse.json(data, { status: 200 });
  const setCookie = backendRes.headers.get('set-cookie');
  if (setCookie) {
    response.headers.set('set-cookie', setCookie);
  }

  return response;
}
