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
        // Add some default accounts
        accounts: {
          create: [
            {
              type: 'SAVINGS',
              bankName: 'HDFC',
              accountNo: 'XXXX1234',
              balance: 125000,
            },
            {
              type: 'SALARY',
              bankName: 'ICICI',
              accountNo: 'XXXX5678',
              balance: 75000,
            },
          ],
        },
        // Add some default cards
        cards: {
          create: [
            {
              type: 'CREDIT',
              bank: 'HDFC',
              lastFourDigits: '1234',
              cardNetwork: 'VISA',
              dueDate: new Date('2024-04-15'),
              billingCycle: 15,
              creditLimit: 200000,
              currentBalance: 45000,
            },
            {
              type: 'CREDIT',
              bank: 'ICICI',
              lastFourDigits: '5678',
              cardNetwork: 'MASTERCARD',
              dueDate: new Date('2024-04-18'),
              billingCycle: 18,
              creditLimit: 150000,
              currentBalance: 25000,
            },
          ],
        },
        // Add some default loans
        loans: {
          create: [
            {
              type: 'CAR',
              bankName: 'HDFC',
              amount: 500000,
              emiAmount: 12500,
              startDate: new Date('2024-01-01'),
              endDate: new Date('2026-12-31'),
              accountId: 'default-account',
            },
          ],
        },
      },
    })
    console.log('Default user and data created:', user.email)
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
