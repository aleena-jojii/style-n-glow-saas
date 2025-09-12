import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = global.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') global.prisma = prisma

// Utility: Basic URL format check
const isValidUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// GET: Fetch all pins
export async function GET() {
  try {
    const pins = await prisma.pin.findMany()
    console.log(`[${new Date().toISOString()}] Pins fetched:`, pins)
    return NextResponse.json({ success: true, data: pins })
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error fetching pins:`, error)
    return NextResponse.json({ success: false, error: 'Failed to fetch pins' }, { status: 500 })
  }
}

// POST: Create a new pin
export async function POST(req) {
  const body = await req.json()
  const { title, imageUrl, affiliateUrl, category, userId } = body

  if (!title || !imageUrl || !userId) {
    return NextResponse.json(
      { success: false, error: 'Missing required fields: title, imageUrl, or userId' },
      { status: 400 }
    )
  }

  if (!isValidUrl(imageUrl) || (affiliateUrl && !isValidUrl(affiliateUrl))) {
    return NextResponse.json(
      { success: false, error: 'Invalid URL format in imageUrl or affiliateUrl' },
      { status: 400 }
    )
  }

  try {
    const newPin = await prisma.pin.create({
      data: { title, imageUrl, affiliateUrl, category, userId },
    })
    console.log(`[${new Date().toISOString()}] New pin created:`, newPin)
    return NextResponse.json({ success: true, data: newPin }, { status: 201 })
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error creating pin:`, error)
    return NextResponse.json(
      { success: false, error: 'Failed to create pin', details: error.message },
      { status: 500 }
    )
  }
}