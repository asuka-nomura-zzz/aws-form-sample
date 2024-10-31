import { z } from 'zod'

export const formSchema = z.object({
  fullName: z.string().regex(/^[^ 　]*$/, { message: "姓と名の間にスペースを入れないでください" }).min(1, { message: "フルネーム（スペースなし）でお名前を入力してください" })
})

export type FormData = z.infer<typeof formSchema>