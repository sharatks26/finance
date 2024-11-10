import { FormConfig } from '@/lib/types/form-fields'
import { z } from 'zod'

type TransactionFormValues = {
  description: string
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER'
  category?: string
  amount: number
  account: string
  toAccount?: string
}

export const TRANSACTION_FORM: FormConfig<TransactionFormValues> = {
  id: 'transaction',
  title: 'New Transaction',
  description: 'Record a new transaction',
  fields: [
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      placeholder: 'Enter description',
      required: true,
      order: 1,
      group: 'basic',
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      options: [
        { label: 'Income', value: 'INCOME' },
        { label: 'Expense', value: 'EXPENSE' },
        { label: 'Transfer', value: 'TRANSFER' },
      ],
      required: true,
      order: 2,
      group: 'basic',
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: [], // Will be populated dynamically based on type
      required: true,
      order: 3,
      group: 'basic',
      conditions: [{ field: 'type', operator: 'notEquals', value: 'TRANSFER' }],
    },
    {
      name: 'amount',
      label: 'Amount',
      type: 'number',
      step: '0.01',
      required: true,
      order: 4,
      group: 'basic',
    },
    {
      name: 'account',
      label: 'Account',
      type: 'select',
      placeholder: 'Select account',
      options: [], // Will be populated dynamically
      required: true,
      order: 5,
      group: 'basic',
    },
    {
      name: 'toAccount',
      label: 'To Account',
      type: 'select',
      placeholder: 'Select destination account',
      options: [], // Will be populated dynamically
      required: true,
      order: 6,
      group: 'transfer',
      conditions: [{ field: 'type', operator: 'equals', value: 'TRANSFER' }],
    },
  ] as const,
  validation: z.object({
    description: z.string().min(3),
    type: z.enum(['INCOME', 'EXPENSE', 'TRANSFER']),
    category: z.string().optional(),
    amount: z.number().positive(),
    account: z.string(),
    toAccount: z.string().optional(),
  }),
}
