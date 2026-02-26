import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64File = `data:${file.type};base64,${buffer.toString('base64')}`;

        const result = await uploadImage(base64File);

        return NextResponse.json({
            url: result.secure_url,
            public_id: result.public_id,
        });
    } catch (error) {
        console.error('Upload API error:', error);
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }
}
