import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Project from '@/lib/models/Project';
import { verifyAdminRequest } from '@/lib/jwt';
import { readLocalData, writeLocalData } from '@/lib/localStore';

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ order: 1 });
    if (projects && projects.length > 0) {
      return NextResponse.json(projects);
    }
  } catch (error: any) {
    console.error('Database connection error in GET /api/projects, using fallback:', error.message || error);
  }
  return NextResponse.json(readLocalData('projects'));
}

export async function POST(req: Request) {
  try {
    const admin = await verifyAdminRequest();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();

    if (!data.title || !data.description || !data.date || !data.techStack) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let dbSuccess = false;
    let newProject = null;

    try {
      await dbConnect();
      newProject = await Project.create(data);
      dbSuccess = true;
    } catch (dbError: any) {
      console.error('Database connection error in POST /api/projects, using local fallback:', dbError.message || dbError);
    }

    // Sync to local store
    const projects = readLocalData('projects');
    const localItem = {
      _id: newProject?._id?.toString() || 'proj_' + Date.now(),
      ...data
    };
    projects.push(localItem);
    projects.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
    writeLocalData('projects', projects);

    return NextResponse.json(newProject || localItem, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create project' },
      { status: 500 }
    );
  }
}