import { NextResponse } from 'next/server';

export async function GET() {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  // Redirect the user to the backend's GitHub OAuth endpoint
  return NextResponse.redirect(`${backendUrl}/auth/github`);
}
