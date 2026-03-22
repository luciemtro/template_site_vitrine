import { z } from "zod"

export const formSchema = z.object({
  email: z
    .email({ message: "Please enter a valid email address" })
    .nonoptional(),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(2000, { message: "Message must be less than 2000 characters" }),
})

export type FormValues = z.infer<typeof formSchema>
export type FormValuesKeys = keyof FormValues
