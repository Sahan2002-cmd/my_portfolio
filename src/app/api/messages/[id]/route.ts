import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Message from '@/lib/models/Message';
import { verifyAdminRequest } from '@/lib/jwt';
import { readLocalData, writeLocalData } from '@/lib/localStore';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const admin = await verifyAdminRequest();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    let dbSuccess = false;
    let deletedMessage = null;
    try {
      await dbConnect();
      deletedMessage = await Message.findByIdAndDelete(id);
      dbSuccess = true;
    } catch (dbError: any) {
      console.error('Database connection error in DELETE /api/messages/[id], using local fallback:', dbError.message || dbError);
    }

    // Sync to local store
    const messages = readLocalData('messages');
    const filtered = messages.filter((m: any) => m._id !== id);
    const itemExisted = messages.length !== filtered.length;
    if (itemExisted) {
      writeLocalData('messages', filtered);
    }

    if (!deletedMessage && !itemExisted) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete message' },
      { status: 500 }
    );
  }
}