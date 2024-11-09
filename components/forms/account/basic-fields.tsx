import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AccountFormValues } from '@/lib/validators/account'
import { UseFormReturn } from 'react-hook-form'

interface BasicFieldsProps {
  form: UseFormReturn<AccountFormValues>
}

export function BasicFields({ form }: BasicFieldsProps) {
  return (
    <>
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
              <Input placeholder="Enter account number" type="text" {...field} />
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
                <SelectItem value="CHECKING">Checking</SelectItem>
                <SelectItem value="CREDIT">Credit</SelectItem>
                <SelectItem value="LOAN">Loan</SelectItem>
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
            <FormLabel>Current Balance</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                step="1000"
                placeholder="1000"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="currency"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Currency</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="INR">INR</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="interestRate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Interest Rate (%)</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                step="0.1"
                placeholder="0.0"
                value={field.value || 0}
                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
