import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  })
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  })
}

export async function createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
  return prisma.user.create({
    data,
  })
}
