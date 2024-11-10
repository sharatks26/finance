import { z } from 'zod'

// Base schema for common fields
const accountBaseSchema = {
  bankName: z.string().min(1, 'Bank name is required'),
  accountNumber: z.string().min(1, 'Account number is required'),
  type: z.enum(['SAVINGS', 'CHECKING', 'CREDIT', 'LOAN', 'SALARY']),
  balance: z.number().min(0),
  currency: z.string().default('USD'),
  interestRate: z.number().optional(),

  // Credit & Loan fields
  creditLimit: z.number().optional(),
  dueDate: z.date().optional(),
  minimumPayment: z.number().optional(),

  // Loan specific fields
  loanAmount: z.number().optional(),
  loanTerm: z.number().optional(),
  loanStartDate: z.date().optional(),
  loanEndDate: z.date().optional(),

  // Salary specific fields
  employerName: z.string().optional(),
  salaryDay: z.number().min(1).max(31).optional(),
}

// Schema for form validation
export const accountSchema = z.object(accountBaseSchema)

// Extended schema for database records
export const accountDbSchema = z.object({
  ...accountBaseSchema,
  id: z.string(),
  userId: z.string(),
  isActive: z.boolean(),
  createdAt: z.date(),
  lastUpdated: z.date(),
})

export type AccountFormValues = z.infer<typeof accountSchema>
export type Account = z.infer<typeof accountDbSchema>

const transactionBaseSchema = {
  description: z.string().optional(),
  type: z.enum(['CREDIT', 'DEBIT']),
  category: z.enum(['FOOD', 'SHOPPING', 'TRANSPORT']).optional(),
  account: z.string().optional(),
}

export const transactionSchema = z.object(transactionBaseSchema)

export type TransactionFormValues = z.infer<typeof transactionSchema>
