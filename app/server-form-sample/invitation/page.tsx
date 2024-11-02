'use client'

import React from 'react'
import { useAppContext } from '../context/useAppContext';
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
  } = useFormContext<FormData>();

  const router = useRouter();

  const onSubmit = handleSubmit(async () => {
    router.push("/server-form-sample/invitation/confirm")
  })

  return (
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
        />
        <p className="text-red-500 text-xs italic">{errors.isAttend?.message}</p>


        <label>参加枠</label>
        <select 
          {...register("selectedTimeslot")}
        >
          {timeslots.map((timeslot) => (
            <option key={timeslot.id} value={timeslot.id}>
              {timeslot.name} あと{timeslot.stock}個
            </option>
          ))}
        </select>
        <p className="text-red-500 text-xs italic">{errors.selectedTimeslot?.message}</p>

        {/* <label>参加人数</label>
        <input
          className={clsx(
            "border appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline", { "border border-red-500": errors.fullName, "": !errors.fullName}
          )}
          id="fullName"
          {...register("fullName")}
        />
        <p className="text-red-500 text-xs italic">{errors.fullName?.message}</p> */}
        <label>参加人数</label>
        <select 
          {...register("numberOfAttendees")}
        >
          <option value="0">
            -
          </option>
          <option value="1">
            1
          </option>
          <option value="2">
            2
          </option>
          <option value="3">
            3
          </option>
        </select>
        <p className="text-red-500 text-xs italic">{errors.selectedTimeslot?.message}</p>
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

        <button type="submit" className="bg-blue-200 py-2 px-1 rounded">送信</button>
      </form>
  )
}

export default page