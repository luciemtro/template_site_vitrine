import { z } from "zod"

export const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  message: z
    .string()
    .min(10)
    .max(2000),
})

export type FormValues = z.infer<typeof formSchema>
export type FormValuesKeys = keyof FormValues
