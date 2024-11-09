import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AccountFormValues } from '@/lib/validators/account'
import { UseFormReturn } from 'react-hook-form'

interface SalaryFieldsProps {
  form: UseFormReturn<AccountFormValues>
}

export function SalaryFields({ form }: SalaryFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="employerName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Employer Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Enter employer name"
                onChange={(e) => field.onChange(e.target.value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="salaryDay"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Salary Day</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                min="1"
                max="31"
                placeholder="Day of month"
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
