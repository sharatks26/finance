import { prisma } from '@/lib/prisma'
import { Account } from '@/lib/validators/account'

export async function getAccounts(): Promise<Account[]> {
  try {
    const accounts = await prisma.account.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return accounts.map((account) => ({
      id: account.id,
      userId: account.userId,
      bankName: account.bankName,
      accountNumber: account.accountNo,
      type: account.type as 'SAVINGS' | 'CHECKING' | 'CREDIT',
      balance: Number(account.balance),
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    }))
  } catch (error) {
    console.error('Error fetching accounts:', error)
    return []
  }
}
