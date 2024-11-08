import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { accountSchema } from '@/lib/validators/account'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { bankName, accountNumber, type, balance } = accountSchema.parse(body)

    const account = await prisma.account.create({
      data: {
        bankName,
        accountNumber,
        type,
        balance,
        userId: session.user.id,
      },
    })

    return new Response(JSON.stringify(account), { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.errors), { status: 400 })
    }
    return new Response('Internal Server Error', { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const accounts = await prisma.account.findMany({
      where: {
        user: {
          id: session.user.id,
        },
      },
    })

    return NextResponse.json(accounts)
  } catch (error) {
    console.error('ACCOUNTS_GET', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
