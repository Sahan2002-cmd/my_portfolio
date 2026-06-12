import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Project from '@/lib/models/Project';
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
    let updatedProject = null;
    try {
      await dbConnect();
      updatedProject = await Project.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      dbSuccess = true;
    } catch (dbError: any) {
      console.error('Database connection error in PUT /api/projects/[id], using local fallback:', dbError.message || dbError);
    }

    // Sync to local store
    const projects = readLocalData('projects');
    const index = projects.findIndex((p: any) => p._id === id);
    let localItem = null;
    if (index !== -1) {
      projects[index] = { ...projects[index], ...data };
      projects.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
      writeLocalData('projects', projects);
      localItem = projects[index];
    } else {
      if (updatedProject) {
        localItem = { _id: id, ...data };
        projects.push(localItem);
        projects.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
        writeLocalData('projects', projects);
      }
    }

    if (!updatedProject && !localItem) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(updatedProject || localItem);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update project' },
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
    let deletedProject = null;
    try {
      await dbConnect();
      deletedProject = await Project.findByIdAndDelete(id);
      dbSuccess = true;
    } catch (dbError: any) {
      console.error('Database connection error in DELETE /api/projects/[id], using local fallback:', dbError.message || dbError);
    }

    // Sync to local store
    const projects = readLocalData('projects');
    const filtered = projects.filter((p: any) => p._id !== id);
    const itemExisted = projects.length !== filtered.length;
    if (itemExisted) {
      writeLocalData('projects', filtered);
    }

    if (!deletedProject && !itemExisted) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete project' },
      { status: 500 }
    );
  }
}
