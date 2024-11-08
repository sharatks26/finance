'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAccount } from '@/hooks/use-accounts'
import { accountSchema, type AccountFormValues } from '@/lib/validators/account'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

interface AccountFormProps {
  initialData?: AccountFormValues
  onSuccess?: () => void
}

export function AccountForm({ initialData, onSuccess }: AccountFormProps) {
  const { createAccount, updateAccount } = useAccount()

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: initialData || {
      bankName: '',
      type: 'SAVINGS',
      balance: '0',
    },
  })

  const onSubmit = async (data: AccountFormValues) => {
    try {
      if (initialData) {
        await updateAccount(data)
      } else {
        await createAccount(data)
      }
      onSuccess?.()
    } catch (error) {
      console.error('Failed to save account:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="bankName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter bank name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter account number"
                  type="text"
                  inputMode="numeric"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="SAVINGS">Savings</SelectItem>
                  <SelectItem value="SALARY">Salary</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Balance</FormLabel>
              <FormControl>
                <Input {...field} type="number" step="0.01" placeholder="0.00" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Add Account
        </Button>
      </form>
    </Form>
  )
}
