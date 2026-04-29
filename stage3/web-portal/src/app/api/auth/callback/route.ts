import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

  if (!code) {
    return NextResponse.json({ status: 'error', message: 'No code provided' }, { status: 400 });
  }

  try {
    // Exchange the code with our backend
    const response = await fetch(`${backendUrl}/auth/github/callback?code=${code}`, {
      method: 'GET',
      headers: { 'X-API-Version': '1' }
    });

    const data = await response.json();

    if (data.status === 'success') {
      const { access_token, refresh_token } = data.data;

      const response = NextResponse.redirect(new URL('/dashboard', request.url));

      // Set HTTP-only cookies
      response.cookies.set('access_token', access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 180 // 3 minutes
      });

      response.cookies.set('refresh_token', refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 300 // 5 minutes
      });

      return response;
    }

    return NextResponse.json({ status: 'error', message: 'Auth failed' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
  }
}
