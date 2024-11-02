import { z } from 'zod'

export const formSchema = z.object({
  fullName: z.string().regex(/^[^ 　]*$/, { message: "姓と名の間にスペースを入れないでください" }).min(1, { message: "フルネーム（スペースなし）でお名前を入力してください" }),
  kanaName: z.string().regex(/^[\u3040-\u309F]+$/, { message: "ひらがな（スペースなし）で入力してください"}),
  email: z.string().regex(/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/, {
    message: "メールアドレスを入力してください"
  }),
  birthdate: z.coerce.date().min(new Date("1950-01-01"), { message: "生年月日を入力してください。"}).max(new Date("2010-01-01"), { message: "生年月日を入力してください。"}),
  isAttend: z.boolean(),
  selectedTimeslot: z.coerce.number().min(0).max(5),
  numberOfAttendees: z.coerce.number().min(0).max(3),
  firstCompanionName: z.string().regex(/^[^ 　]*$/, { message: "姓と名の間にスペースを入れないでください" }).min(0),
  secondCompanionName: z.string().regex(/^[^ 　]*$/, { message: "姓と名の間にスペースを入れないでください" }).min(0),
})
.refine(
  (data) => {
    if (data.isAttend) {
      return data.selectedTimeslot !== 0;
    }
    return true;
  },
  {
    message: "参加する時間帯を選択してください",
    path: ["selectedTimeslot"]
  }
)
.refine(
  (data) => {
    if (data.isAttend) {
      return data.numberOfAttendees !== 0;
    }
    return true;
  },
  {
    message: "参加する人数を選択してください",
    path: ["numberOfAttendees"]
  }
)
.refine(
  (data) => {
    if (data.numberOfAttendees >= 2) {
      return data.firstCompanionName.length !== 0;
    }
    return true;
  },
  {
    message: "1人目のご同伴者様のお名前を入力してください",
    path: ["firstCompanionName"]
  }
)
.refine(
  (data) => {
    if (data.numberOfAttendees === 3) {
      return data.secondCompanionName.length !== 0;
    }
    return true;
  },
  {
    message: "2人目のご同伴者様のお名前を入力してください",
    path: ["secondCompanionName"]
  }
)
.refine(
  (data) => {
    if (data.numberOfAttendees === 1) {
      return data.firstCompanionName.length === 0;
    }
    return true;
  },
  {
    message: "1人目のご同伴者様のお名前が入力されています",
    path: ["firstCompanionName"]
  }
)
.refine(
  (data) => {
    if (data.numberOfAttendees === 1) {
      return data.secondCompanionName.length === 0;
    }
    return true;
  },
  {
    message: "2人目のご同伴者様のお名前が入力されています",
    path: ["secondCompanionName"]
  }
)
.refine(
  (data) => {
    if (data.numberOfAttendees === 2) {
      return data.secondCompanionName.length === 0;
    }
    return true;
  },
  {
    message: "2人目のご同伴者様のお名前が入力されています",
    path: ["secondCompanionName"]
  }
)
.refine(
  (data) => {
    if (!data.isAttend) {
      return data.selectedTimeslot === 0;
    }
    return true;
  },
  {
    message: "参加時間帯が入力されています",
    path: ["selectedTimeslot"]
  }
)
.refine(
  (data) => {
    if (!data.isAttend) {
      return data.numberOfAttendees === 0;
    }
    return true;
  },
  {
    message: "参加人数が入力されています",
    path: ["numberOfAttendees"]
  }
)
.refine(
  (data) => {
    if (!data.isAttend) {
      return data.firstCompanionName.length === 0;
    }
    return true;
  },
  {
    message: "1人目のご同伴者様のお名前が入力されています",
    path: ["firstCompanionName"]
  }
)
.refine(
  (data) => {
    if (!data.isAttend) {
      return data.secondCompanionName.length === 0;
    }
    return true;
  },
  {
    message: "2人目のご同伴者様のお名前が入力されています",
    path: ["secondCompanionName"]
  }
)


export type FormData = z.infer<typeof formSchema>