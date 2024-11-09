import { prisma } from '@/lib/prisma'
import { Account, AccountFormValues } from '@/lib/validators/account'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth'

export async function getAccounts(): Promise<Account[]> {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) throw new Error('Unauthorized')

    const accounts = await prisma.account.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return accounts.map((account) => ({
      id: account.id,
      userId: account.userId,
      bankName: account.bankName,
      accountNumber: account.accountNumber,
      type: account.type,
      balance: Number(account.balance),
      currency: account.currency,
      isActive: account.isActive,
      interestRate: account.interestRate ? Number(account.interestRate) : undefined,
      creditLimit: account.creditLimit ? Number(account.creditLimit) : undefined,
      dueDate: account.dueDate || undefined,
      minimumPayment: account.minimumPayment ? Number(account.minimumPayment) : undefined,
      loanAmount: account.loanAmount ? Number(account.loanAmount) : undefined,
      loanTerm: account.loanTerm ? Number(account.loanTerm) : undefined,
      loanStartDate: account.loanStartDate || undefined,
      loanEndDate: account.loanEndDate || undefined,
      employerName: account.employerName || undefined,
      salaryDay: account.salaryDay ? Number(account.salaryDay) : undefined,
      createdAt: account.createdAt,
      lastUpdated: account.lastUpdated,
    }))
  } catch (error) {
    console.error('Error fetching accounts:', error)
    throw error
  }
}

export async function createAccount(data: AccountFormValues) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) throw new Error('Unauthorized')

    const account = await prisma.account.create({
      data: {
        userId: session.user.id,
        bankName: data.bankName,
        accountNumber: data.accountNumber,
        type: data.type,
        balance: data.balance,
        currency: data.currency,
        interestRate: data.interestRate,
        creditLimit: data.creditLimit,
        dueDate: data.dueDate,
        minimumPayment: data.minimumPayment,
        loanAmount: data.loanAmount,
        loanTerm: data.loanTerm,
        loanStartDate: data.loanStartDate,
        loanEndDate: data.loanEndDate,
        employerName: data.employerName,
        salaryDay: data.salaryDay,
      },
    })

    return account
  } catch (error) {
    console.error('Error creating account:', error)
    throw error
  }
}

export async function updateAccount(data: AccountFormValues & { id: string }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) throw new Error('Unauthorized')

    const account = await prisma.account.update({
      where: {
        id: data.id,
        userId: session.user.id,
      },
      data: {
        bankName: data.bankName,
        accountNumber: data.accountNumber,
        type: data.type,
        balance: data.balance,
        currency: data.currency,
        interestRate: data.interestRate,
        creditLimit: data.creditLimit,
        dueDate: data.dueDate,
        minimumPayment: data.minimumPayment,
        loanAmount: data.loanAmount,
        loanTerm: data.loanTerm,
        loanStartDate: data.loanStartDate,
        loanEndDate: data.loanEndDate,
        employerName: data.employerName,
        salaryDay: data.salaryDay,
      },
    })

    return account
  } catch (error) {
    console.error('Error updating account:', error)
    throw error
  }
}

export async function deleteAccount(accountId: string) {
  try {
    const deletedAccount = await prisma.account.delete({
      where: { id: accountId },
    })
    return deletedAccount
  } catch (error) {
    throw error
  }
}
