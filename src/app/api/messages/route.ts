import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Message from '@/lib/models/Message';
import { verifyAdminRequest } from '@/lib/jwt';
import { readLocalData, writeLocalData } from '@/lib/localStore';

export async function GET() {
  try {
    const admin = await verifyAdminRequest();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      await dbConnect();
      const messages = await Message.find({}).sort({ createdAt: -1 });
      return NextResponse.json(messages);
    } catch (dbError: any) {
      console.error('Database connection error in GET /api/messages, using fallback:', dbError.message || dbError);
    }
    return NextResponse.json(readLocalData('messages'));
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    let dbSuccess = false;
    let newMessage = null;

    try {
      await dbConnect();
      newMessage = await Message.create(data);
      dbSuccess = true;
    } catch (dbError: any) {
      console.error('Database connection error in POST /api/messages, using local fallback:', dbError.message || dbError);
    }

    // Sync to local store
    const messages = readLocalData('messages');
    const localItem = {
      _id: newMessage?._id?.toString() || 'msg_' + Date.now(),
      createdAt: new Date().toISOString(),
      ...data
    };
    messages.unshift(localItem);
    writeLocalData('messages', messages);

    return NextResponse.json(newMessage || localItem, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to send message' },
      { status: 500 }
    );
  }
}
