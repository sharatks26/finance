import { AccountFieldConfig, FieldConfig, SelectField } from '@/lib/types/form-fields'
import { TransactionFormValues } from '@/lib/validators/account'

export type FieldType = 'text' | 'number' | 'date' | 'select'

export interface AccountTypeConfig {
  label: string
  value: string
  fields: AccountFieldConfig[]
}

export const COMMON_FIELDS: AccountFieldConfig[] = [
  {
    name: 'bankName',
    label: 'Bank Name',
    type: 'text',
    placeholder: 'Enter bank name',
    required: true,
    order: 1,
    group: 'basic',
  },
  {
    name: 'accountNumber',
    label: 'Account Number',
    type: 'text',
    placeholder: 'Enter account number',
    required: true,
    order: 2,
    group: 'basic',
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
    required: true,
    order: 3,
    group: 'basic',
  },
  {
    name: 'balance',
    label: 'Current Balance',
    type: 'number',
    step: '1000',
    placeholder: '1000',
    required: true,
    order: 4,
    group: 'financial',
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
    required: true,
    order: 5,
    group: 'financial',
  },
  {
    name: 'interestRate',
    label: 'Interest Rate (%)',
    type: 'number',
    step: '0.1',
    placeholder: '0.0',
    order: 6,
    group: 'financial',
  },
] as const

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
  },
}

export const TRANSACTION_FIELDS: FieldConfig<TransactionFormValues>[] = [
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
    name: 'amount',
    label: 'Amount',
    type: 'number',
    step: '0.01',
    placeholder: '0.00',
    required: true,
    order: 2,
    group: 'basic',
  },
  {
    name: 'type',
    label: 'Type',
    type: 'select',
    options: [
      { label: 'Credit', value: 'CREDIT' },
      { label: 'Debit', value: 'DEBIT' },
      { label: 'Transfer', value: 'TRANSFER' },
    ],
    required: true,
    order: 3,
    group: 'basic',
  } as SelectField<TransactionFormValues>,
  {
    name: 'category',
    label: 'Category',
    type: 'select',
    placeholder: 'Select category',
    options: [
      { label: 'Food', value: 'FOOD' },
      { label: 'Shopping', value: 'SHOPPING' },
      { label: 'Transport', value: 'TRANSPORT' },
    ],
    required: false,
    order: 4,
    group: 'basic',
  } as SelectField<TransactionFormValues>,
  {
    name: 'account',
    label: 'Account',
    type: 'select',
    placeholder: 'Select account',
    options: [],
    required: true,
    order: 5,
    group: 'basic',
  } as SelectField<TransactionFormValues>,
  {
    name: 'toAccount',
    label: 'To Account',
    type: 'select',
    placeholder: 'Select destination account',
    options: [],
    required: false,
    order: 6,
    group: 'basic',
    conditions: [{ field: 'type', operator: 'equals', value: 'TRANSFER' }],
  } as SelectField<TransactionFormValues>,
] as const
