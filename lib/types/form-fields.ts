import { AccountFormValues, TransactionFormValues } from '@/lib/validators/account'
import { z } from 'zod'

export type BaseFieldType = 'text' | 'number' | 'date' | 'select'

export interface BaseFieldConfig<T = unknown> {
  name: keyof T
  label: string
  type: BaseFieldType
  required?: boolean
  disabled?: boolean
  hidden?: boolean
  order?: number
  group?: string
  description?: string
  conditions?: {
    field: keyof T
    operator: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan'
    value: unknown
  }[]
}

export interface TextField<T = unknown> extends BaseFieldConfig<T> {
  type: 'text'
  placeholder?: string
  minLength?: number
  maxLength?: number
}

export interface NumberField<T = unknown> extends BaseFieldConfig<T> {
  type: 'number'
  step?: string
  min?: number
  max?: number
  placeholder?: string
}

export interface SelectField<T = unknown> extends BaseFieldConfig<T> {
  type: 'select'
  options: { label: string; value: string }[]
  placeholder?: string
  multiple?: boolean
}

export interface DateField<T = unknown> extends BaseFieldConfig<T> {
  type: 'date'
  min?: string
  max?: string
}

export type FieldConfig<T = unknown> = TextField<T> | NumberField<T> | SelectField<T> | DateField<T>

export interface FormConfig<T = unknown> {
  id: string
  title: string
  description?: string
  fields: FieldConfig<T>[]
  validation?: z.ZodType<T>
}

// Type aliases for account-specific fields
export type AccountFieldConfig = FieldConfig<AccountFormValues>
export type AccountFormConfig = FormConfig<AccountFormValues>

export type TransactionFieldConfig = FieldConfig<TransactionFormValues>
export type TransactionFormConfig = FormConfig<TransactionFormValues>
