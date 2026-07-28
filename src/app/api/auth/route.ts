import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/dbConnect';
import Admin from '@/lib/models/Admin';
import { signToken, verifyAdminRequest } from '@/lib/jwt';
import appConfig from '../../../../index.js';

// Login endpoint (POST)
export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    let admin = null;
    let isValid = false;
    let dbConnected = false;

    try {
      await dbConnect();
      dbConnected = true;
      // 1. Try to find the Admin in the MongoDB database
      admin = await Admin.findOne({});
    } catch (dbError: any) {
      console.error('Database connection failed in login POST, using local fallback:', dbError.message || dbError);
    }

    if (dbConnected && admin) {
      // If admin exists in database, compare against the database record
      if (username === admin.username) {
        isValid = await bcrypt.compare(password, admin.password);
      }
    } else {
      // 2. Fallback to the env or shared config values if no database admin exists yet or DB connection fails
      const adminUsernameEnv = process.env.ADMIN_USERNAME || appConfig.adminUsername || 'admin';
      const adminPasswordEnv = process.env.ADMIN_PASSWORD || appConfig.adminPassword || 'Admin@123';

      if (username === adminUsernameEnv) {
        if (
          adminPasswordEnv.startsWith('$2b$') ||
          adminPasswordEnv.startsWith('$2a$')
        ) {
          isValid = await bcrypt.compare(password, adminPasswordEnv);
        } else {
          isValid = password === adminPasswordEnv;
        }
      }
    }

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = signToken({ userId: 'admin', username });
    const cookieStore = await cookies();

    cookieStore.set({
      name: 'admin_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return NextResponse.json({ success: true, username, dbOffline: !dbConnected });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}

// Session check endpoint (GET)
export async function GET() {
  const admin = await verifyAdminRequest();

  if (!admin) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  let dbOffline = false;
  try {
    await dbConnect();
  } catch (dbError) {
    dbOffline = true;
  }

  return NextResponse.json({ authenticated: true, username: admin.username, dbOffline }, { status: 200 });
}

// Change credentials endpoint (PUT)
export async function PUT(req: Request) {
  try {
    const admin = await verifyAdminRequest();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { username: newUsername, password: newPassword } = await req.json();

    if (!newUsername || !newPassword) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Hash the new password using bcrypt
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the single admin document, or create it if none exists
    const updatedAdmin = await Admin.findOneAndUpdate(
      {}, // Empty filter: matches first document found
      { username: newUsername, password: hashedPassword },
      { upsert: true, new: true }
    );

    // Sign a new token for the updated user session
    const token = signToken({ userId: 'admin', username: updatedAdmin.username });
    const cookieStore = await cookies();

    cookieStore.set({
      name: 'admin_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return NextResponse.json({ success: true, username: updatedAdmin.username });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update credentials' },
      { status: 500 }
    );
  }
}

// Logout endpoint (DELETE)
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'admin_session',
    value: '',
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  return NextResponse.json({ success: true });
}