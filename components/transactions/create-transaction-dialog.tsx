'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useAccount } from '@/hooks/use-accounts'
import { TRANSACTION_FIELDS, type FieldConfig } from '@/lib/config/account-fields'
import { TransactionFormValues, transactionSchema } from '@/lib/validators/account'
import { zodResolver } from '@hookform/resolvers/zod'
import { Account } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { DynamicField } from '../forms/account/dynamic-field'
import { Form } from '../ui/form'

type TransactionField = Omit<FieldConfig, 'name'> & {
  name: keyof TransactionFormValues
  options?: { label: string; value: string }[]
}

function isValidTransactionField(field: FieldConfig): field is TransactionField {
  return field.name in transactionSchema.shape
}

export function CreateTransactionDialog({ children }: { children: React.ReactNode }) {
  const { accounts } = useAccount()
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: 'CREDIT',
    },
  })

  const [fields, setFields] = useState(TRANSACTION_FIELDS.filter(isValidTransactionField))

  const onSubmit = async (data: TransactionFormValues) => {
    console.log(data)
  }

  useEffect(() => {
    setFields((prevFields) =>
      prevFields.map((field) => ({
        ...field,
        options:
          field.name === 'account'
            ? accounts.map((account: Account) => ({
                label: account.bankName,
                value: account.id,
              }))
            : field.options,
      }))
    )
  }, [accounts])

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transaction</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1">
              {fields.map((field) => (
                <DynamicField<TransactionFormValues> key={field.name} field={field} form={form} />
              ))}
            </div>
            <Button className="w-full mt-6" type="submit">
              Add Transaction
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
