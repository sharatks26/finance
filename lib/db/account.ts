import { prisma } from '@/lib/prisma'
import { Account } from '@prisma/client'

export async function getAccountsByUserId(userId: string) {
  return prisma.account.findMany({
    where: { userId },
    include: {
      Transaction: {
        orderBy: { date: 'desc' },
        take: 5,
      },
    },
  })
}

export async function createAccount(data: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>) {
  return prisma.account.create({
    data,
  })
}
