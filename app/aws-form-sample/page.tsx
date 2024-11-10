'use client'

import React, { useState } from 'react'
import Link from 'next/link';
import { useAppContext } from '../hooks/useAppContext';
import { useFormContext } from 'react-hook-form'
import { FormData } from '../types/FormData';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

const Page = () => {
  const { timeslotsFromAws: timeslots } = useAppContext()
  const {
    register,
    handleSubmit,
    formState: { errors } 
  } = useFormContext<FormData>()
  const router = useRouter()
  const [isAttend, setIsAttend] = useState(false)
  const [numberOfAttendees, setNumberOfAttendees] = useState<string>('0')

  const onSubmit = handleSubmit(async () => {
    router.push("/aws-form-sample/confirm")
  })

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h2 className="font-semibold text-lg mb-2">大手フットウェアブランドによるインフルエンサー招待イベントのための参加登録フォーム</h2>
        <p className="text-sm">大手フットウェアブランドのマーケティングキャンペーンの一環として、インフルエンサーを対象としたイベント応募フォームを開発しました。セキュリティポリシーに基づき、データの転送時および保管時の暗号化が必須要件とされたのでAWSを用いて実装を行いました。こちらは実際の作成したものに似せて改めて作ったものです。</p>

        <h4 className="font-semibold mt-4">ポイント</h4>
        <ul className="list-disc ml-4 text-sm">
          <li>セキュリティ要件を満たすため、AWSのAPI Gateway、Lambda、DynamoDBを用いたサーバーレスアーキテクチャを採用</li>
          <li>Next.jsで構築したフロントエンドからAPI Gatewayで実装したREST APIを介して、LambdaからDynamoDBのテーブルへCRUD操作を行った</li>
          <li>API GatewayでのHTTPS通信によりSSL/TLS暗号化を行い、転送時のセキュリティを確保</li>
          <li>DynamoDBによって保管データの暗号化にも対応</li>
          <li>当初はSupabaseの知見を活かすため、PostgreSQLが使えるAurora Serverlessの利用を検討したが、コストの懸念があったことから、key-value型のDynamoDBを採用</li>
          <li>運営者側の利便性を考えてAdminページを作成し、そこからCRUD操作をできるようにした</li>

        </ul>
      </div>
      <div className="text-right my-8">
        <Link href="/aws-form-sample/admin" className="underline">adminページ</Link>
      </div>
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
      
    </div>          
  )
}

export default Page