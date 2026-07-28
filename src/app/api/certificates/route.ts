import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Certificate from '@/lib/models/Certificate';
import { verifyAdminRequest } from '@/lib/jwt';
import { readLocalData, writeLocalData } from '@/lib/localStore';

export async function GET() {
  try {
    await dbConnect();
    const certificates = await Certificate.find({}).sort({ year: -1 });
    if (certificates && certificates.length > 0) {
      return NextResponse.json(certificates);
    }
  } catch (error: any) {
    console.error('Database connection error in GET /api/certificates, using fallback:', error.message || error);
  }
  return NextResponse.json(readLocalData('certificates'));
}

export async function POST(req: Request) {
  try {
    const admin = await verifyAdminRequest();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();

    if (!data.title || !data.organization || !data.year) {
      return NextResponse.json(
        { error: 'Missing required fields (title, organization, and year are required)' },
        { status: 400 }
      );
    }

    let dbSuccess = false;
    let newCertificate = null;

    try {
      await dbConnect();
      newCertificate = await Certificate.create(data);
      dbSuccess = true;
    } catch (dbError: any) {
      console.error('Database connection error in POST /api/certificates, using local fallback:', dbError.message || dbError);
    }

    // Sync to local store
    const certificates = readLocalData('certificates');
    const localItem = {
      _id: newCertificate?._id?.toString() || 'c_' + Date.now(),
      ...data
    };
    certificates.push(localItem);
    certificates.sort((a: any, b: any) => (b.year || '').localeCompare(a.year || ''));
    writeLocalData('certificates', certificates);

    return NextResponse.json(newCertificate || localItem, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create certificate' },
      { status: 500 }
    );
  }
}