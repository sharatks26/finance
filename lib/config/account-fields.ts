import { z } from 'zod'
import { AccountFormValues } from '../validators/account'

export type FieldType = 'text' | 'number' | 'date' | 'select'

export interface FieldConfig {
  name: keyof AccountFormValues
  label: string
  type: FieldType
  placeholder?: string
  step?: string
  min?: number
  max?: number
  options?: { label: string; value: string }[]
  validation?: z.ZodType<unknown>
  defaultValue?: unknown
}

export interface AccountTypeConfig {
  label: string
  value: string
  fields: FieldConfig[]
}

export const COMMON_FIELDS: FieldConfig[] = [
  {
    name: 'bankName',
    label: 'Bank Name',
    type: 'text',
    placeholder: 'Enter bank name',
  },
  {
    name: 'accountNumber',
    label: 'Account Number',
    type: 'text',
    placeholder: 'Enter account number',
  },
  {
    name: 'type',
    label: 'Account Type',
    type: 'select',
    options: [
      { label: 'Savings', value: 'SAVINGS' },
      { label: 'Checking', value: 'CHECKING' },
      { label: 'Credit', value: 'CREDIT' },
      { label: 'Loan', value: 'LOAN' },
      { label: 'Salary', value: 'SALARY' },
    ],
  },
  {
    name: 'balance',
    label: 'Current Balance',
    type: 'number',
    step: '1000',
    placeholder: '1000',
  },
  {
    name: 'currency',
    label: 'Currency',
    type: 'select',
    options: [
      { label: 'INR', value: 'INR' },
      { label: 'USD', value: 'USD' },
      { label: 'EUR', value: 'EUR' },
      { label: 'GBP', value: 'GBP' },
    ],
  },
  {
    name: 'interestRate',
    label: 'Interest Rate (%)',
    type: 'number',
    step: '0.1',
    placeholder: '0.0',
  },
]

export const ACCOUNT_TYPES: Record<string, AccountTypeConfig> = {
  CREDIT: {
    label: 'Credit',
    value: 'CREDIT',
    fields: [
      {
        name: 'creditLimit',
        label: 'Credit Limit',
        type: 'number',
        step: '0.01',
        placeholder: '0.00',
      },
      {
        name: 'dueDate',
        label: 'Due Date',
        type: 'date',
      },
      {
        name: 'minimumPayment',
        label: 'Minimum Payment',
        type: 'number',
        step: '0.01',
        placeholder: '0.00',
      },
    ],
  },
  LOAN: {
    label: 'Loan',
    value: 'LOAN',
    fields: [
      {
        name: 'loanAmount',
        label: 'Loan Amount',
        type: 'number',
        step: '0.01',
        placeholder: '0.00',
      },
      {
        name: 'loanTerm',
        label: 'Loan Term (months)',
        type: 'number',
      },
    ],
  },
  SALARY: {
    label: 'Salary',
    value: 'SALARY',
    fields: [
      {
        name: 'employerName',
        label: 'Employer Name',
        type: 'text',
        placeholder: 'Enter employer name',
      },
      {
        name: 'salaryDay',
        label: 'Salary Day',
        type: 'number',
        min: 1,
        max: 31,
        placeholder: 'Day of month',
      },
    ],
  },
}
