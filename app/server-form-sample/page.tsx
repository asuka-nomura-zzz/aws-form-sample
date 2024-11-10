'use client'

import React, { useState } from 'react'
import Link from 'next/link';
import { useAppContext } from '../hooks/useAppContext';
import { useFormContext } from 'react-hook-form'
import { FormData } from '../types/FormData';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

const Page = () => {
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
    router.push('/server-form-sample/confirm')
  })

  return (
    <div className="mb-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="font-semibold text-lg mb-2">インフルエンサー招待小規模イベントの応募フォームの開発 （サーバーコンポーネントでデータ取得）</h2>
        <p className="text-sm">前回に引き続き、インフルエンサーを招待するイベントのための登録フォームを開発しました。2024年3月に制作した応募フォームでは、データベースに登録する前の型チェックが不十分であり、またブラウザ側にAPIキーなどの認証情報を渡す仕様にも課題があったため、フォームの機能改善を試みました。</p>

        <h4 className="font-semibold mt-4">ポイント</h4>
        <ul className="list-disc ml-4 text-sm">
          <li>Next.jsのサーバーコンポーネントを活用し、データの取得処理をサーバー側で実行するよう変更し、ブラウザにAPIキーなど認証情報を渡さない設計を試みた</li>
          <li>ユーザーの利便性を考え、送信前の確認ページ、送信後のサンクスページ、送信後のエラーページを追加した</li>
          <li>運用側の利便性を考え、データ登録イベントをwebhookで受け取り、Google Apps Scriptを用いたスクリプトでスプレッドシートに更新書き込みを行い、ダッシュボード画面にサマリーを表示するようにした</li>
          <li>フォーム入力時のエラーを未然に防ぐため、React Hook Formとzodを用いた型チェックとバリデーションを導入し、入力データの型エラーを減らした</li>
        </ul>
      </div>

      <form onSubmit={onSubmit}>
        <label>お名前</label>
        <input
          type="text"
          className={clsx(
            "border appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline", { "border border-red-500": errors.fullName, "": !errors.fullName}
          )}
          id="fullName"
          {...register("fullName")}
        />
        <p className="text-red-500 text-xs italic">{errors.fullName?.message}</p>

        <label>かな</label>
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