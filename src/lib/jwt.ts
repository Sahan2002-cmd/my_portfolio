import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev-only-change-this-in-env';

export interface AdminTokenPayload {
  userId: string;
  username: string;
}

export function signToken(payload: AdminTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): AdminTokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminTokenPayload;
  } catch {
    return null;
  }
}

export async function verifyAdminRequest(): Promise<AdminTokenPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}