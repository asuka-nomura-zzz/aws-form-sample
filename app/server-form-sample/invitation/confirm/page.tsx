'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import { useAppContext } from '../../context/useAppContext'

const page = () => {
  const router = useRouter()
  const { getValues, handleSubmit, reset } = useFormContext()
  const values = getValues();

  // const { timeslots } = useAppContext;

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })

    // try catch文で在庫データの更新および、インフルエンサーの登録を行う
    // 全部成功したらthanksページに遷移する、エラーならエラーページに遷移する

    router.push('/server-form-sample/invitation/thanks')
    reset()
  })
  
  return (
    <form onSubmit={onSubmit}>
      名前：{values.fullName}

      <button type="submit" className="bg-yellow-300">送信する</button>
    </form>
  )
}

export default page