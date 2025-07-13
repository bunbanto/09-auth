import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { parse } from 'cookie';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await api.post('auth/register', body);

    const cookieStore = await cookies();
    const setCookie = apiRes.headers['set-cookie'];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: Number(parsed['Max-Age']),
        };
        if (parsed.accessToken)
          cookieStore.set('accessToken', parsed.accessToken, options);
        if (parsed.refreshToken)
          cookieStore.set('refreshToken', parsed.refreshToken, options);
      }
      return NextResponse.json(apiRes.data);
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } catch (error) {
    // Відповідь з повідомленням про помилку
    let message = 'Registration failed';
    let status = 500;
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const err = error as {
        response?: { data?: { message?: string }; status?: number };
      };
      message = err.response?.data?.message || message;
      status = err.response?.status || status;
    }
    return NextResponse.json({ error: message }, { status });
  }
}
