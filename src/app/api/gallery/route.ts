import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const images = await prisma.galleryImage.findMany({
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(images);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { url, category, span, order } = await req.json();
        const newImage = await prisma.galleryImage.create({
            data: { url, category, span, order: order || 0 },
        });
        return NextResponse.json(newImage);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create gallery image' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { id, ...data } = await req.json();
        const updatedImage = await prisma.galleryImage.update({
            where: { id },
            data,
        });
        return NextResponse.json(updatedImage);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update gallery image' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

        await prisma.galleryImage.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete gallery image' }, { status: 500 });
    }
}
