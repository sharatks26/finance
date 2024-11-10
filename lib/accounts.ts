import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { AccountFormValues } from './validators/account'

export async function createAccount(data: AccountFormValues) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      throw new Error('Unauthorized')
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      throw new Error('User not found')
    }

    const account = await prisma.account.create({
      data: {
        ...data,
        userId: user.id,
        isActive: true,
        lastUpdated: new Date(),
        createdAt: new Date(),
      },
    })

    return account
  } catch (error) {
    console.error('Account creation error:', error)
    throw error
  }
}

export async function getAccounts() {
  const session = await getServerSession()
  if (!session?.user?.email) {
    throw new Error('Unauthorized')
  }

  return prisma.account.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
    orderBy: { createdAt: 'desc' },
  })
}

export async function updateAccount(data: AccountFormValues & { id: string }) {
  const session = await getServerSession()
  if (!session?.user?.email) {
    throw new Error('Unauthorized')
  }

  return prisma.account.update({
    where: { id: data.id },
    data: {
      ...data,
      lastUpdated: new Date(),
    },
  })
}

export async function deleteAccount(id: string) {
  const session = await getServerSession()
  if (!session?.user?.email) {
    throw new Error('Unauthorized')
  }

  return prisma.account.delete({
    where: { id: id },
  })
}
