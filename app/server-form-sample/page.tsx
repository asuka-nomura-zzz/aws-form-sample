'use client'

import React, { useState } from 'react'
import Link from 'next/link';
import { useAppContext } from '../hooks/useAppContext';
import { useFormContext } from 'react-hook-form'
import { FormData } from '../types/FormData';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

const page = () => {
  const { timeslots } = useAppContext()
  const {
    register,
    handleSubmit,
    formState: { errors } 
  } = useFormContext<FormData>()
  const router = useRouter()
  const [isAttend, setIsAttend] = useState(false)
  const [numberOfAttendees, setNumberOfAttendees] = useState<string>('0')

  const onSubmit = handleSubmit(async () => {
    router.push("/server-form-sample/invitation/confirm")
  })

  return (
    <>
      <section>
        <h2>ここはサーバー側でデータ取得をするようにしています。</h2>
      </section>
      <form onSubmit={onSubmit}>
        <label>名前</label>
        <input
          type="text"
          className={clsx(
            "border appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline", { "border border-red-500": errors.fullName, "": !errors.fullName}
          )}
          id="fullName"
          {...register("fullName")}
        />
        <p className="text-red-500 text-xs italic">{errors.fullName?.message}</p>

        <label>読み仮名</label>
        <input
          type="text"
          className={clsx(
            "border appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline", { "border border-red-500": errors.kanaName, "": !errors.kanaName}
          )}
          id="kanaName"
          {...register("kanaName")}
        />
        <p className="text-red-500 text-xs italic">{errors.kanaName?.message}</p>

        <label>メールアドレス</label>
        <input
          type="text"
          className={clsx(
            "border appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline", { "border border-red-500": errors.email, "": !errors.email}
          )}
          id="email"
          {...register("email")}
        />
        <p className="text-red-500 text-xs italic">{errors.email?.message}</p>

        <label>生年月日</label>
        <input
          type="date"
          className={clsx(
            "border appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline", { "border border-red-500": errors.birthdate, "": !errors.birthdate}
          )}
          id="birthdate"
          {...register("birthdate")}
        />
        <p className="text-red-500 text-xs italic">{errors.birthdate?.message}</p>
        
        <label>参加しますか？</label>
        <input
          type="checkbox"
          className="mb-3"
          id="isAttend"
          {...register("isAttend")}
          onChange={() => setIsAttend(!isAttend)}
        />
        <p className="text-red-500 text-xs italic">{errors.isAttend?.message}</p>

        <label>時間帯</label>
        <select 
          {...register("selectedTimeslot")}
        >
          <option value="">-</option>
          {timeslots.map((timeslot) => (
            <option key={timeslot.id} value={timeslot.id}>
              {timeslot.name} ※残り{timeslot.stock}枠
            </option>
          ))}
        </select>
        <p className="text-red-500 text-xs italic">{errors.selectedTimeslot?.message}</p>

        <label>参加人数</label>
        <select 
          {...register("numberOfAttendees")}
          onChange={(event) => setNumberOfAttendees(event.target.value)}
        >
          <option value="0">
            -
          </option>
          <option value="1">1名（ご本人様のみ）</option>
          <option value="2">2名（同伴者様1名）</option>
          <option value="3">3名（同伴者様2名）</option>
        </select>
        <p className="text-red-500 text-xs italic">{errors.numberOfAttendees?.message}</p>

        <label>一人目の同伴者</label>
        <input
          type="text"
          className={clsx(
            "border appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline", { "border border-red-500": errors.firstCompanionName, "": !errors.firstCompanionName}
          )}
          id="firstCompanionName"
          {...register("firstCompanionName")}
        />
        <p className="text-red-500 text-xs italic">{errors.firstCompanionName?.message}</p> 

        <label>二人目の同伴者</label>
        <input
          type="text"
          className={clsx(
            "border appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline", { "border border-red-500": errors.secondCompanionName, "": !errors.secondCompanionName}
          )}
          id="secondCompanionName"
          {...register("secondCompanionName")}
        />
        <p className="text-red-500 text-xs italic">{errors.secondCompanionName?.message}</p>  

        <div className="flex flex-row items-center justify-center gap-8 mt-4">
          <Link href="/" className="hover:underline">TOPへ戻る</Link>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 duration-200">確認する</button>
        </div>
        
      </form>
      
    </>          
  )
}

export default page