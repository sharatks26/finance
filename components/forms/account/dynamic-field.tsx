import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FieldConfig } from '@/lib/config/account-fields'
import { AccountFormValues } from '@/lib/validators/account'
import { UseFormReturn } from 'react-hook-form'

interface DynamicFieldProps {
  field: FieldConfig
  form: UseFormReturn<AccountFormValues>
}

export function DynamicField({ field, form }: DynamicFieldProps) {
  const getInputValue = (fieldType: FieldConfig['type'], value: unknown): string => {
    if (fieldType === 'date' && value instanceof Date) {
      return value.toISOString().split('T')[0]
    }
    if (typeof value === 'number') {
      return value.toString()
    }
    return (value as string) || ''
  }

  return (
    <FormField
      control={form.control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem>
          <FormLabel>{field.label}</FormLabel>
          <FormControl>
            {field.type === 'select' ? (
              <Select
                onValueChange={formField.onChange}
                defaultValue={String(formField.value || '')}
              >
                <SelectTrigger>
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                value={getInputValue(field.type, formField.value)}
                onChange={(e) => {
                  const value =
                    field.type === 'number'
                      ? Number(e.target.value)
                      : field.type === 'date'
                        ? new Date(e.target.value)
                        : e.target.value
                  formField.onChange(value)
                }}
                type={field.type}
                step={field.step}
                min={field.min}
                max={field.max}
                placeholder={field.placeholder}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
