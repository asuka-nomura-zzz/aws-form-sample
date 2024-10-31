'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FormData } from '../types/FormData';
import clsx from 'clsx';

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors } 
  } = useFormContext<FormData>();

  const onSubmit = handleSubmit(async () => {console.log('submit')})

  return (
      <form onSubmit={onSubmit}>
        <input
          className={clsx(
            "shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline", { "border border-red-500": errors.fullName, "": !errors.fullName}
          )}
          {...register("fullName")}
        />
        <p className="text-red-500 text-xs italic">{errors.fullName?.message}</p>

        <button type="submit" className="bg-blue-200 py-2 px-1 rounded">送信</button>
      </form>
  )
}

export default Page