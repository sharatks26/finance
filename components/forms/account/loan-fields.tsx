import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AccountFormValues } from '@/lib/validators/account'
import { UseFormReturn } from 'react-hook-form'

interface LoanFieldsProps {
  form: UseFormReturn<AccountFormValues>
}

export function LoanFields({ form }: LoanFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="loanAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Loan Amount</FormLabel>
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
        name="loanTerm"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Loan Term (months)</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
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
