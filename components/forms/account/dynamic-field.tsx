import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DateField,
  FieldConfig,
  NumberField,
  SelectField,
  TextField,
} from '@/lib/types/form-fields'
import { Path, UseFormReturn } from 'react-hook-form'

interface DynamicFieldProps<T extends Record<string, unknown>> {
  field: FieldConfig<T>
  form: UseFormReturn<T>
}

export function DynamicField<T extends Record<string, unknown>>({
  field,
  form,
}: DynamicFieldProps<T>) {
  // Type guard functions
  const isNumberField = (field: FieldConfig<T>): field is NumberField<T> => field.type === 'number'
  const isDateField = (field: FieldConfig<T>): field is DateField<T> => field.type === 'date'
  const isSelectField = (field: FieldConfig<T>): field is SelectField<T> => field.type === 'select'
  const isTextField = (field: FieldConfig<T>): field is TextField<T> => field.type === 'text'

  const getInputValue = (value: unknown): string => {
    if (value instanceof Date) {
      return value.toISOString().split('T')[0]
    }
    if (typeof value === 'number') {
      return value.toString()
    }
    return (value as string) || ''
  }

  const getInputProps = () => {
    if (isNumberField(field)) {
      return {
        type: 'number',
        step: field.step,
        min: field.min,
        max: field.max,
        placeholder: field.placeholder,
      }
    }
    if (isDateField(field)) {
      return {
        type: 'date',
        min: field.min,
        max: field.max,
      }
    }
    if (isTextField(field)) {
      return {
        type: 'text',
        placeholder: field.placeholder,
        minLength: field.minLength,
        maxLength: field.maxLength,
      }
    }
    return {}
  }

  return (
    <FormField
      control={form.control}
      name={field.name as Path<T>}
      render={({ field: formField }) => (
        <FormItem>
          <FormLabel>{field.label}</FormLabel>
          <FormControl>
            {isSelectField(field) ? (
              <Select
                onValueChange={formField.onChange}
                defaultValue={String(formField.value || '')}
                disabled={field.disabled}
              >
                <SelectTrigger>
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                {...getInputProps()}
                value={getInputValue(formField.value)}
                onChange={(e) => {
                  const value = isNumberField(field)
                    ? Number(e.target.value)
                    : isDateField(field)
                      ? new Date(e.target.value)
                      : e.target.value
                  formField.onChange(value)
                }}
                disabled={field.disabled}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
