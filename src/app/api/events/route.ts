import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import logger from '@/lib/logger';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    // 1. Autentikasi
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      logger.error('Unauthorized: No user session found');
      return NextResponse.json(
        { 
          level: 'error',
          message: 'Unauthorized: No user session found',
          timestamp: new Date().toISOString()
        }, 
        { status: 401 }
      );
    }

    // 2. Parsing FormData
    const formData = await request.formData();
    
    // 3. Validasi Data
    const requiredFields = ['title', 'description', 'location', 'category', 'startDate', 'endDate'];
    const missingFields = requiredFields.filter(field => !formData.get(field));
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          missingFields 
        },
        { status: 400 }
      );
    }

    // 4. Ekstraksi Data
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string;
    const category = formData.get('category') as string;
    const price = parseInt((formData.get('price') as string) || '0', 10);
    const startDate = new Date(formData.get('startDate') as string);
    const endDate = new Date(formData.get('endDate') as string);
    const availableSeat = parseInt(formData.get('availableSeat') as string) || 0;
    const imageFile = formData.get('image') as File | null;

    // 5. Validasi harga dan tanggal
    if (isNaN(price) || isNaN(availableSeat) || isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json({ error: 'Invalid input for price, availableSeat, or dates' }, { status: 400 });
    }

    // 6. Upload Gambar ke Supabase (jika ada)
    let imageUrl = null;
    if (imageFile) {
      try {
        const fileExt = imageFile.name.split('.').pop();
        const filePath = `events/${session.user.id}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('event-images')
          .upload(filePath, imageFile);

        if (uploadError) {
          logger.error('Upload image error:', uploadError.message);
          throw new Error('Failed to upload image');
        }

        const { data: { publicUrl } } = supabase.storage
          .from('event-images')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      } catch (error) {
        logger.error('Image upload failed:', error);
        // Lanjut tanpa gambar jika gagal
      }
    }

    // 7. Simpan ke Database
    const event = await prisma.event.create({
      data: {
        name: title,
        description,
        location,
        category,
        price,
        startDate,
        endDate,
        availableSeat,
        image: imageUrl,
        organizerId: session.user.id,
      },
    });

    // 8. Log dan Response Sukses
    logger.info(`Event created - ID: ${event.id} by User: ${session.user.id}`);
    return NextResponse.json(event, { status: 201 });

  } catch (error: any) {
    // 9. Error Handling
    logger.error('Create event error:', error);
    
    return NextResponse.json(
      {
        level: 'error',
        message: error instanceof Error ? error.message : 'Internal server error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false, // Penting untuk FormData
  },
};
