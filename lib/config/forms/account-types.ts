import { FormConfig } from '@/lib/types/form-fields'
import { AccountFormValues } from '@/lib/validators/account'
import { z } from 'zod'

// Base validation schema that all account types share
const baseAccountSchema = z.object({
  bankName: z.string().min(1),
  type: z.enum(['SAVINGS', 'CHECKING', 'CREDIT', 'LOAN', 'SALARY']),
  accountNumber: z.string().min(1),
  balance: z.number(),
  currency: z.string(),
  interestRate: z.number().optional(),
})

export const CREDIT_ACCOUNT: FormConfig<AccountFormValues> = {
  id: 'credit',
  title: 'Credit Account',
  description: 'Add a new credit card account',
  fields: [
    {
      name: 'creditLimit',
      label: 'Credit Limit',
      type: 'number',
      step: '0.01',
      placeholder: '0.00',
      required: true,
      group: 'credit-details',
      order: 1,
    },
    {
      name: 'dueDate',
      label: 'Due Date',
      type: 'date',
      required: true,
      group: 'credit-details',
      order: 2,
    },
    {
      name: 'minimumPayment',
      label: 'Minimum Payment',
      type: 'number',
      step: '0.01',
      placeholder: '0.00',
      required: true,
      group: 'credit-details',
      order: 3,
    },
  ] as const,
  validation: baseAccountSchema.extend({
    creditLimit: z.number().min(0),
    dueDate: z.date(),
    minimumPayment: z.number().min(0),
    loanAmount: z.number().optional(),
    loanTerm: z.number().optional(),
    employerName: z.string().optional(),
    salaryDay: z.number().optional(),
  }),
}

export const LOAN_ACCOUNT: FormConfig<AccountFormValues> = {
  id: 'loan',
  title: 'Loan Account',
  description: 'Add a new loan account',
  fields: [
    {
      name: 'loanAmount',
      label: 'Loan Amount',
      type: 'number',
      step: '0.01',
      placeholder: '0.00',
      required: true,
      group: 'loan-details',
      order: 1,
    },
    {
      name: 'loanTerm',
      label: 'Loan Term (months)',
      type: 'number',
      required: true,
      group: 'loan-details',
      order: 2,
    },
  ] as const,
  validation: baseAccountSchema.extend({
    loanAmount: z.number().positive(),
    loanTerm: z.number().positive().int(),
    creditLimit: z.number().optional(),
    dueDate: z.date().optional(),
    minimumPayment: z.number().optional(),
    employerName: z.string().optional(),
    salaryDay: z.number().optional(),
  }),
}

export const SALARY_ACCOUNT: FormConfig<AccountFormValues> = {
  id: 'salary',
  title: 'Salary Account',
  description: 'Add a new salary account',
  fields: [
    {
      name: 'employerName',
      label: 'Employer Name',
      type: 'text',
      placeholder: 'Enter employer name',
      required: true,
      group: 'employment-details',
      order: 1,
    },
    {
      name: 'salaryDay',
      label: 'Salary Day',
      type: 'number',
      min: 1,
      max: 31,
      placeholder: 'Day of month',
      required: true,
      group: 'employment-details',
      order: 2,
    },
  ] as const,
  validation: baseAccountSchema.extend({
    employerName: z.string().min(1),
    salaryDay: z.number().min(1).max(31),
    creditLimit: z.number().optional(),
    dueDate: z.date().optional(),
    minimumPayment: z.number().optional(),
    loanAmount: z.number().optional(),
    loanTerm: z.number().optional(),
  }),
}

export const ACCOUNT_TYPES: Record<string, FormConfig<AccountFormValues>> = {
  CREDIT: CREDIT_ACCOUNT,
  LOAN: LOAN_ACCOUNT,
  SALARY: SALARY_ACCOUNT,
}
