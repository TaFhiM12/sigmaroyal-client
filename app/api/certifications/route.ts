import { NextResponse } from 'next/server';
import { apiUrl } from '@/lib/api';

export const dynamic = 'force-dynamic';

const fallbackResponse = {
  success: true,
  data: [],
  message: 'Certifications are temporarily unavailable',
};

export async function GET() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    const response = await Promise.race([
      fetch(apiUrl('/certifications'), {
        cache: 'no-store',
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      }),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 3500)),
    ]);

    if (!response || !response.ok) {
      return NextResponse.json(fallbackResponse);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(fallbackResponse);
  } finally {
    clearTimeout(timeout);
  }
}
