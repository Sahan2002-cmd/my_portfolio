import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Skill from '@/lib/models/Skill';
import { verifyAdminRequest } from '@/lib/jwt';
import { readLocalData, writeLocalData } from '@/lib/localStore';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(req: Request, { params }: RouteParams) {
  try {
    const admin = await verifyAdminRequest();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const data = await req.json();

    let dbSuccess = false;
    let updatedSkill = null;
    try {
      await dbConnect();
      updatedSkill = await Skill.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      dbSuccess = true;
    } catch (dbError: any) {
      console.error('Database connection error in PUT /api/skills/[id], using local fallback:', dbError.message || dbError);
    }

    // Sync to local store
    const skills = readLocalData('skills');
    const index = skills.findIndex((s: any) => s._id === id);
    let localItem = null;
    if (index !== -1) {
      skills[index] = { ...skills[index], ...data };
      skills.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
      writeLocalData('skills', skills);
      localItem = skills[index];
    } else {
      if (updatedSkill) {
        localItem = { _id: id, ...data };
        skills.push(localItem);
        skills.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
        writeLocalData('skills', skills);
      }
    }

    if (!updatedSkill && !localItem) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
    }

    return NextResponse.json(updatedSkill || localItem);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update skill' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const admin = await verifyAdminRequest();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    let dbSuccess = false;
    let deletedSkill = null;
    try {
      await dbConnect();
      deletedSkill = await Skill.findByIdAndDelete(id);
      dbSuccess = true;
    } catch (dbError: any) {
      console.error('Database connection error in DELETE /api/skills/[id], using local fallback:', dbError.message || dbError);
    }

    // Sync to local store
    const skills = readLocalData('skills');
    const filtered = skills.filter((s: any) => s._id !== id);
    const itemExisted = skills.length !== filtered.length;
    if (itemExisted) {
      writeLocalData('skills', filtered);
    }

    if (!deletedSkill && !itemExisted) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete skill' },
      { status: 500 }
    );
  }
}