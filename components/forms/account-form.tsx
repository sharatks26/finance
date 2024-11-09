'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useAccount } from '@/hooks/use-accounts'
import { ACCOUNT_TYPES, COMMON_FIELDS } from '@/lib/config/account-fields'
import { accountSchema, type AccountFormValues } from '@/lib/validators/account'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { DynamicField } from './account/dynamic-field'

interface AccountFormProps {
  initialData?: AccountFormValues
  onSuccess?: () => void
}

export function AccountForm({ initialData, onSuccess }: AccountFormProps) {
  const router = useRouter()
  const { createAccount, updateAccount } = useAccount()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: initialData || {
      bankName: '',
      type: 'SAVINGS',
      balance: 0,
      accountNumber: '',
      currency: 'INR',
      interestRate: 0,
    },
  })

  const onSubmit = async (data: AccountFormValues) => {
    setIsSubmitting(true)
    setError('')

    try {
      if (initialData) {
        await updateAccount(data)
      } else {
        await createAccount(data)
        form.reset()
      }
      router.refresh()
      onSuccess?.()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save account')
    } finally {
      setIsSubmitting(false)
    }
  }

  const accountType = form.watch('type')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
        {error && <div className="text-sm text-red-500 font-medium">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COMMON_FIELDS.map((field) => (
            <DynamicField key={field.name} field={field} form={form} />
          ))}

          {accountType &&
            ACCOUNT_TYPES[accountType]?.fields.map((field) => (
              <DynamicField key={field.name} field={field} form={form} />
            ))}
        </div>

        <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : initialData ? 'Update Account' : 'Add Account'}
        </Button>
      </form>
    </Form>
  )
}
