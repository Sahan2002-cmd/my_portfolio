import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Experience from '@/lib/models/Experience';
import { verifyAdminRequest } from '@/lib/jwt';
import { readLocalData, writeLocalData } from '@/lib/localStore';

export async function GET() {
  try {
    await dbConnect();
    const experiences = await Experience.find({}).sort({ order: 1 });
    if (experiences && experiences.length > 0) {
      return NextResponse.json(experiences);
    }
  } catch (error: any) {
    console.error('Database connection error in GET /api/experience, using fallback:', error.message || error);
  }
  return NextResponse.json(readLocalData('experience'));
}

export async function POST(req: Request) {
  try {
    const admin = await verifyAdminRequest();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();

    if (!data.role || !data.company || !data.period || !data.type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let dbSuccess = false;
    let newExperience = null;

    try {
      await dbConnect();
      newExperience = await Experience.create(data);
      dbSuccess = true;
    } catch (dbError: any) {
      console.error('Database connection error in POST /api/experience, using local fallback:', dbError.message || dbError);
    }

    // Sync to local store
    const experiences = readLocalData('experience');
    const localItem = {
      _id: newExperience?._id?.toString() || 'exp_' + Date.now(),
      ...data
    };
    experiences.push(localItem);
    experiences.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
    writeLocalData('experience', experiences);

    return NextResponse.json(newExperience || localItem, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create experience' },
      { status: 500 }
    );
  }
}