import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { supabase } from '@/lib/supabase'
import logger from '@/lib/logger'

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()

    // ✅ Log token Supabase dari cookies
    const token = cookieStore.get('sb-kryvuewxfngisuwdqksi-auth-token')
    logger.info('Supabase Auth Token:', token?.value)

    const supabaseClient = createRouteHandlerClient({ cookies: () => cookies() })

    const {
      data: { session },
      error: sessionError,
    } = await supabaseClient.auth.getSession()

    if (sessionError) {
      logger.error('Gagal mendapatkan session: ' + sessionError.message)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!session) {
      logger.error('Unauthorized: No user session found.')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const location = formData.get('location') as string
    const category = formData.get('category') as string
    const price = parseInt(formData.get('price') as string, 10)
    const startDate = formData.get('startDate') as string
    const endDate = formData.get('endDate') as string
    const availableSeat = parseInt(formData.get('availableSeat') as string, 10)
    const imageFile = formData.get('image') as File | null

    let imageUrl = ''
    if (imageFile) {
      const filePath = `events/${Date.now()}_${imageFile.name}`
      const { data: uploadData, error: uploadError } = await supabaseClient.storage
        .from('event-images')
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) {
        logger.error('Upload image error: ' + uploadError.message)
        return NextResponse.json({ error: 'Gagal mengupload gambar' }, { status: 500 })
      }

      const {
        data: { publicUrl },
      } = supabaseClient.storage.from('event-images').getPublicUrl(filePath)

      imageUrl = publicUrl
    }

    const event = await prisma.event.create({
      data: {
        name: title,
        description,
        location,
        category,
        price,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        availableSeat,
        image: imageUrl,
        organizerId: session.user.id,
      },
    })

    logger.info('✅ Event berhasil dibuat: ' + event.id)
    return NextResponse.json(event)
  } catch (error: any) {
    logger.error('❌ Error saat create event: ' + (error?.message || String(error)))
    return NextResponse.json(
      {
        error: 'Terjadi kesalahan saat mengirim data',
        detail: error?.message || String(error),
      },
      { status: 500 }
    )
  }
}
