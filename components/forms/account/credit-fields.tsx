import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AccountFormValues } from '@/lib/validators/account'
import { UseFormReturn } from 'react-hook-form'

interface CreditFieldsProps {
  form: UseFormReturn<AccountFormValues>
}

export function CreditFields({ form }: CreditFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="creditLimit"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Credit Limit</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                step="0.01"
                placeholder="0.00"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="dueDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Due Date</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="date"
                value={field.value ? field.value.toISOString().split('T')[0] : ''}
                onChange={(e) => field.onChange(new Date(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="minimumPayment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Minimum Payment</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                step="0.01"
                placeholder="0.00"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
