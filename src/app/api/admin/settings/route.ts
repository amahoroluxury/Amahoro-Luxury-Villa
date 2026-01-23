import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    let settings = await prisma.settings.findFirst();

    if (!settings) {
      // Create default settings if they don't exist
      settings = await prisma.settings.create({
        data: {
          nightlyRate: 500,
          depositPercent: 50,
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Get Settings Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nightlyRate, depositPercent } = body;

    const settings = await prisma.settings.upsert({
      where: { id: 'site-settings' },
      update: { nightlyRate, depositPercent },
      create: { 
        id: 'site-settings',
        nightlyRate, 
        depositPercent 
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Update Settings Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
