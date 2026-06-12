import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Experience from '@/lib/models/Experience';
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
    let updatedExperience = null;
    try {
      await dbConnect();
      updatedExperience = await Experience.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      dbSuccess = true;
    } catch (dbError: any) {
      console.error('Database connection error in PUT /api/experience/[id], using local fallback:', dbError.message || dbError);
    }

    // Sync to local store
    const experiences = readLocalData('experience');
    const index = experiences.findIndex((e: any) => e._id === id);
    let localItem = null;
    if (index !== -1) {
      experiences[index] = { ...experiences[index], ...data };
      experiences.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
      writeLocalData('experience', experiences);
      localItem = experiences[index];
    } else {
      if (updatedExperience) {
        localItem = { _id: id, ...data };
        experiences.push(localItem);
        experiences.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
        writeLocalData('experience', experiences);
      }
    }

    if (!updatedExperience && !localItem) {
      return NextResponse.json({ error: 'Experience item not found' }, { status: 404 });
    }

    return NextResponse.json(updatedExperience || localItem);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update experience' },
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
    let deletedExperience = null;
    try {
      await dbConnect();
      deletedExperience = await Experience.findByIdAndDelete(id);
      dbSuccess = true;
    } catch (dbError: any) {
      console.error('Database connection error in DELETE /api/experience/[id], using local fallback:', dbError.message || dbError);
    }

    // Sync to local store
    const experiences = readLocalData('experience');
    const filtered = experiences.filter((e: any) => e._id !== id);
    const itemExisted = experiences.length !== filtered.length;
    if (itemExisted) {
      writeLocalData('experience', filtered);
    }

    if (!deletedExperience && !itemExisted) {
      return NextResponse.json({ error: 'Experience item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete experience' },
      { status: 500 }
    );
  }
}
