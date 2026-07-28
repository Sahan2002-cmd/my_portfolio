import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Skill from '@/lib/models/Skill';
import { verifyAdminRequest } from '@/lib/jwt';
import { readLocalData, writeLocalData } from '@/lib/localStore';

export async function GET() {
  try {
    await dbConnect();
    const skills = await Skill.find({}).sort({ order: 1 });
    if (skills && skills.length > 0) {
      return NextResponse.json(skills);
    }
  } catch (error: any) {
    console.error('Database connection error in GET /api/skills, using fallback:', error.message || error);
  }
  return NextResponse.json(readLocalData('skills'));
}

export async function POST(req: Request) {
  try {
    const admin = await verifyAdminRequest();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();

    if (!data.name || !data.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let dbSuccess = false;
    let newSkill = null;

    try {
      await dbConnect();
      newSkill = await Skill.create(data);
      dbSuccess = true;
    } catch (dbError: any) {
      console.error('Database connection error in POST /api/skills, using local fallback:', dbError.message || dbError);
    }

    // Sync to local store
    const skills = readLocalData('skills');
    const localItem = {
      _id: newSkill?._id?.toString() || 's_' + Date.now(),
      ...data
    };
    skills.push(localItem);
    skills.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
    writeLocalData('skills', skills);

    return NextResponse.json(newSkill || localItem, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create skill' },
      { status: 500 }
    );
  }
}