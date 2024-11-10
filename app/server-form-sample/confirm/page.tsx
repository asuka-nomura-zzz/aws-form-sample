'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import Link from 'next/link'
import { Influencer } from '@/app/types/Influencer'
import { postInfluencer } from '@/app/utils/postInfluencer'
import { decreaseStock } from '@/app/utils/decreaseStock'

const Page = () => {
  const router = useRouter()
  const { getValues, handleSubmit, reset } = useFormContext()

  const onSubmit = handleSubmit(async () => {
    const influencer: Influencer = {
      full_name: getValues('fullName'),
      kana_name: getValues('kanaName'),
      email: getValues('email'),
      birthdate: getValues('birthdate'),
      is_attend: getValues('isAttend'),
      timeslot: Number(getValues('selectedTimeslot')),
      number_of_attendees: Number(getValues('numberOfAttendees')),
      first_companion_name: getValues('firstCompanionName'),
      second_companion_name: getValues('secondCompanionName'),
    };

    try {
      await decreaseStock(getValues('selectedTimeslot'), getValues('numberOfAttendees'))
      await postInfluencer(influencer)

      router.push('/server-form-sample/thanks')
      reset()
    } catch (error) {
      console.error('An error occurred during submission:', error)
      router.push('/server-form-sample/error')
    }
  })

  return (
    <>
     <form onSubmit={onSubmit} className="max-w-3xl mx-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">項目</th>
            <th className="border border-gray-300 px-4 py-2">内容</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">名前</td>
            <td className="border border-gray-300 px-4 py-2">{getValues('fullName')}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">よみ仮名</td>
            <td className="border border-gray-300 px-4 py-2">{getValues('kanaName')}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">メールアドレス</td>
            <td className="border border-gray-300 px-4 py-2">{getValues('email')}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">生年月日</td>
            <td className="border border-gray-300 px-4 py-2">{getValues('birthdate')}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">出席</td>
            <td className="border border-gray-300 px-4 py-2">{getValues('isAttend') ? 'する' : 'しない'}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">時間帯</td>
            <td className="border border-gray-300 px-4 py-2">{getValues('selectedTimeslot') || '-'}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">参加人数</td>
            <td className="border border-gray-300 px-4 py-2">{getValues('numberOfAttendees') || '-'}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">1人目の同伴者</td>
            <td className="border border-gray-300 px-4 py-2">{getValues('firstCompanionName') || 'なし'}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">2人目の同伴者</td>
            <td className="border border-gray-300 px-4 py-2">{getValues('secondCompanionName') || 'なし'}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex flex-row items-center justify-center gap-8 mt-4">
        <Link href="/server-form-sample" className="hover:underline">戻る</Link>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 duration-200">送信する</button>
      </div>
    </form>

    </>
  )
}

export default Page
