import { z } from 'zod'

export const accountSchema = z.object({
  id: z.string(),
  userId: z.string(),
  bankName: z.string(),
  accountNumber: z.string(),
  type: z.enum(['SAVINGS', 'CHECKING', 'CREDIT']),
  balance: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Account = z.infer<typeof accountSchema>
export type AccountFormValues = z.infer<typeof accountSchema>
