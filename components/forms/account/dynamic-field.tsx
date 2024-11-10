import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FieldType } from '@/lib/config/account-fields'
import { Path, UseFormReturn } from 'react-hook-form'

// Generic interface for field configuration
interface GenericFieldConfig<T> {
  name: keyof T
  label: string
  type: FieldType
  placeholder?: string
  step?: string
  min?: number
  max?: number
  options?: { label: string; value: string }[]
}

interface DynamicFieldProps<T extends Record<string, unknown>> {
  field: GenericFieldConfig<T>
  form: UseFormReturn<T>
}

export function DynamicField<T extends Record<string, unknown>>({
  field,
  form,
}: DynamicFieldProps<T>) {
  const getInputValue = (fieldType: FieldType, value: unknown): string => {
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
      name={field.name as Path<T>}
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
