import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Certificate from '@/lib/models/Certificate';
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
    let updatedCertificate = null;
    try {
      await dbConnect();
      updatedCertificate = await Certificate.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      dbSuccess = true;
    } catch (dbError: any) {
      console.error('Database connection error in PUT /api/certificates/[id], using local fallback:', dbError.message || dbError);
    }

    // Sync to local store
    const certificates = readLocalData('certificates');
    const index = certificates.findIndex((c: any) => c._id === id);
    let localItem = null;
    if (index !== -1) {
      certificates[index] = { ...certificates[index], ...data };
      certificates.sort((a: any, b: any) => (b.year || '').localeCompare(a.year || ''));
      writeLocalData('certificates', certificates);
      localItem = certificates[index];
    } else {
      if (updatedCertificate) {
        localItem = { _id: id, ...data };
        certificates.push(localItem);
        certificates.sort((a: any, b: any) => (b.year || '').localeCompare(a.year || ''));
        writeLocalData('certificates', certificates);
      }
    }

    if (!updatedCertificate && !localItem) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    }

    return NextResponse.json(updatedCertificate || localItem);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update certificate' },
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
    let deletedCertificate = null;
    try {
      await dbConnect();
      deletedCertificate = await Certificate.findByIdAndDelete(id);
      dbSuccess = true;
    } catch (dbError: any) {
      console.error('Database connection error in DELETE /api/certificates/[id], using local fallback:', dbError.message || dbError);
    }

    // Sync to local store
    const certificates = readLocalData('certificates');
    const filtered = certificates.filter((c: any) => c._id !== id);
    const itemExisted = certificates.length !== filtered.length;
    if (itemExisted) {
      writeLocalData('certificates', filtered);
    }

    if (!deletedCertificate && !itemExisted) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete certificate' },
      { status: 500 }
    );
  }
}
