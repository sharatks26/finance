import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const defaultUser = {
    email: process.env.AUTH_EMAIL || 'admin@financetracker.local',
    password: process.env.AUTH_PASSWORD || 'P@ssw0rd123!Secure',
    name: 'Finance Admin',
  }

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email: defaultUser.email },
  })

  if (!existingUser) {
    // Create default user
    const hashedPassword = await hash(defaultUser.password, 12)
    const user = await prisma.user.create({
      data: {
        email: defaultUser.email,
        password: hashedPassword,
        name: defaultUser.name,
      },
    })
    console.log('Default user created:', user.email)
  } else {
    console.log('Default user already exists:', existingUser.email)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
