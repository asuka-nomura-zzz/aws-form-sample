'use client'

import Link from "next/link"
import { useState } from "react";


type Work = {
  id: number;
  title: string;
  stacks: string[];
  text: string;
  url: string;
  workDate: string;
  workPeriod: string
}

const works: Work[] = [
  {
    id: 1, 
    title: '【1回目】クライアント側でuseEffect、useStateを用いた簡易的な応募フォーム', 
    stacks: ['React', 'Next.js', 'Tailwind CSS', 'Supabase'], 
    text: 'インフルエンサーイベントへの招待状サイト。当初はGoogleフォームを用いて簡易的にインフルエンサーへ希望時間の聞き取りをやる予定とのことだったが、5つに分かれているそれぞれの時間帯は、それぞれ参加数の上限があるため、上限にひっかからないように枠の在庫の制御を行う必要があった。そのため、ECサイトのように在庫データと連動させた応募フォームを作成する必要があり、依頼があった。開発時間は極めて短く、数日間のみ。データベースにSupabaseを使用。ReactのuseEffect関数でページレンダリングの際にバックエンドから在庫数を取得して、フロント側でレンダリングするという仕組みで開発をした。', 
    url: '/client-form-sample',
    workDate: '2024.3',
    workPeriod: '3日間',
  },
  {
    id: 2, 
    title: '【2回目】zod、React Hook Formを用いて、サーバーコンポーネントでデータを取得するようにした応募フォーム', 
    stacks: ['React', 'Next.js', 'Tailwind CSS', 'Supabase'], 
    text: '前回の案件の続きの案件。前回の反省から、フロント側での型のバリデーションを厳密にするため、zod、React Hook Formを使用。クライアント側でuseEffectでデータを取得するのではなく、あらかじめサーバーコンポーネント側でデータフェッチする仕組みに変更。フォーム送信前とフォーム送信後の確認画面も作成した。SupabaseではRLS(Row Level Security)を用いて、データの読み書きの安全性を高めた。', 
    url: '/server-form-sample',
    workDate: '2024.6',
    workPeriod: '2週間',
  },
  {
    id: 3, 
    title: '【3回目】AWSのAPI Gateway、Lambda、DynamoDBを用いて洗練させた応募フォーム', 
    stacks: ['React', 'Next.js', 'Tailwind CSS', 'API Gateway', 'Lambda', 'DynamoDB'], 
    text: '前回、前々回のフォームの続きの案件。前回までの仕事が好評だったため、大手シューズブランドが関わるより規模の大きいインフルエンサー招待イベントのフォーム開発を担当。大手シューズブランドのセキュリティ要件を満たすため、バックエンド側をAWSのサーバーレスアーキテクチャで構築。通信時の暗号化としてはデフォルトでHTTPSのみを受け付けるAPI Gatewayでエンドポイントを作成し、保管時の暗号化にはデフォルトで暗号化が行われるDynamoDBを使用。当初はPostgreSQLを用いるためにAurora Serverlessを検討していたが、コスト増の懸念があったため、Key-value型のDynamoDBを採用した。', 
    url: '/aws-form-sample',
    workDate: '2024.8',
    workPeriod: '1週間',
  }
]


export default function Home() {
  
  const allStacks = ['すべて', 'React', 'Next.js', 'Tailwind CSS', 'API Gateway', 'Lambda', 'DynamoDB']

  // filtered works by technology stack used
  const reactWorks = works.filter((work: Work) => {
    return work.stacks.includes('React')
  })
  const nextWorks = works.filter((work: Work) => {
    return work.stacks.includes('Next.js')
  })
  const tailwindWorks = works.filter((work: Work) => {
    return work.stacks.includes('Tailwind CSS')
  })
  const apiGatewayWorks = works.filter((work: Work) => {
    return work.stacks.includes('API Gateway')
  })
  const lambdaWorks = works.filter((work: Work) => {
    return work.stacks.includes('Lambda')
  })
  const dynamoDBWorks = works.filter((work: Work) => {
    return work.stacks.includes('DynamoDB')
  })
  const supabaseWorks = works.filter((work: Work) => {
    return work.stacks.includes('Supabase')
  })
  const zodWorks = works.filter((work: Work) => {
    return work.stacks.includes('zod')
  })
  const reactHookFormWorks = works.filter((work: Work) => {
    return work.stacks.includes('React Hook Form')
  })

  const [selected, setSelected] = useState<string>('すべて');


  return (
    <>
      {/* <Link href="./client-form-sample">
        <p className="flex justify-center py-4 hover:underline">Client Side Rendering</p>
      </Link>
      <Link href="./server-form-sample/invitation">
        <p className="flex justify-center py-4 hover:underline">Server Side Rendering</p>
      </Link> */}

      <div className="flex flex-row gap-8 items-center justify-center min-h-[50vh]">
        <div className="bg-purple-200 w-1/4">
          画像
        </div>
        <div className="bg-teal-200 w-3/4">
          <h2>のむらあすか</h2>
          <p>プロフィールテキストプロフィールテキストプロフィールテキストプロフィールテキストプロフィールテキストプロフィールテキストプロフィールテキストプロフィールテキストプロフィールテキストプロフィールテキスト</p>
        </div>
      </div>

      <h3>Works</h3>

      {allStacks.map((link) => (
        <button key={link} onClick={() => setSelected(link)} className="bg-gray-300 p-1 m-1 rounded-lg">{link}</button>
      ))}

      {selected === 'すべて' &&
        <div className="grid grid-cols-3 gap-4">
          {works.map((work) => (
            <Link key={work.id} href={work.url}>
              <div className="bg-gray-100 p-4">
                <div className="flex flex-row flex-wrap items-center justify-center h-16">
                  {work.stacks.map((stack, i) => (
                    <span key={i} className="text-xs bg-blue-500 text-white p-1 mx-1 my-1 rounded">{stack}</span>
                  ))}
                </div>
                <h3 className="font-bold h-24">{work.title}</h3>
                {/* <p className="text-sm">{work.text}</p> */}
                <small>{work.workDate}</small><br/>
                <small>{work.workPeriod}</small>
              </div>
            </Link>
          ))}
        </div>
      }

      {selected === 'React' &&
        <div className="grid grid-cols-3 gap-4">
          {reactWorks.map((work) => (
            <Link key={work.id} href={work.url}>
              <div className="bg-gray-100 p-4">
                <div className="flex flex-row flex-wrap items-center justify-center h-16">
                  {work.stacks.map((stack, i) => (
                    <span key={i} className="text-xs bg-blue-500 text-white p-1 mx-1 my-1 rounded">{stack}</span>
                  ))}
                </div>
                <h3 className="font-bold h-24">{work.title}</h3>
                {/* <p className="text-sm">{work.text}</p> */}
                <small>{work.workDate}</small><br/>
                <small>{work.workPeriod}</small>
              </div>
            </Link>
          ))}
        </div>
      }

      {selected === 'Next.js' &&
        <div className="grid grid-cols-3 gap-4">
          {nextWorks.map((work) => (
            <Link key={work.id} href={work.url}>
              <div className="bg-gray-100 p-4">
                <div className="flex flex-row flex-wrap items-center justify-center h-16">
                  {work.stacks.map((stack, i) => (
                    <span key={i} className="text-xs bg-blue-500 text-white p-1 mx-1 my-1 rounded">{stack}</span>
                  ))}
                </div>
                <h3 className="font-bold h-24">{work.title}</h3>
                {/* <p className="text-sm">{work.text}</p> */}
                <small>{work.workDate}</small><br/>
                <small>{work.workPeriod}</small>
              </div>
            </Link>
          ))}
        </div>
      }

      {selected === 'Tailwind CSS' &&
        <div className="grid grid-cols-3 gap-4">
          {tailwindWorks.map((work) => (
            <Link key={work.id} href={work.url}>
              <div className="bg-gray-100 p-4">
                <div className="flex flex-row flex-wrap items-center justify-center h-16">
                  {work.stacks.map((stack, i) => (
                    <span key={i} className="text-xs bg-blue-500 text-white p-1 mx-1 my-1 rounded">{stack}</span>
                  ))}
                </div>
                <h3 className="font-bold h-24">{work.title}</h3>
                {/* <p className="text-sm">{work.text}</p> */}
                <small>{work.workDate}</small><br/>
                <small>{work.workPeriod}</small>
              </div>
            </Link>
          ))}
        </div>
      }

      {selected === 'API Gateway' &&
        <div className="grid grid-cols-3 gap-4">
          {apiGatewayWorks.map((work) => (
            <Link key={work.id} href={work.url}>
              <div className="bg-gray-100 p-4">
                <div className="flex flex-row flex-wrap items-center justify-center h-16">
                  {work.stacks.map((stack, i) => (
                    <span key={i} className="text-xs bg-blue-500 text-white p-1 mx-1 my-1 rounded">{stack}</span>
                  ))}
                </div>
                <h3 className="font-bold h-24">{work.title}</h3>
                {/* <p className="text-sm">{work.text}</p> */}
                <small>{work.workDate}</small><br/>
                <small>{work.workPeriod}</small>
              </div>
            </Link>
          ))}
        </div>
      }

      {selected === 'Lambda' &&
        <div className="grid grid-cols-3 gap-4">
          {lambdaWorks.map((work) => (
            <Link key={work.id} href={work.url}>
              <div className="bg-gray-100 p-4">
                <div className="flex flex-row flex-wrap items-center justify-center h-16">
                  {work.stacks.map((stack, i) => (
                    <span key={i} className="text-xs bg-blue-500 text-white p-1 mx-1 my-1 rounded">{stack}</span>
                  ))}
                </div>
                <h3 className="font-bold h-24">{work.title}</h3>
                {/* <p className="text-sm">{work.text}</p> */}
                <small>{work.workDate}</small><br/>
                <small>{work.workPeriod}</small>
              </div>
            </Link>
          ))}
        </div>
      }

      {selected === 'DynamoDB' &&
        <div className="grid grid-cols-3 gap-4">
          {dynamoDBWorks.map((work) => (
            <Link key={work.id} href={work.url}>
              <div className="bg-gray-100 p-4">
                <div className="flex flex-row flex-wrap items-center justify-center h-16">
                  {work.stacks.map((stack, i) => (
                    <span key={i} className="text-xs bg-blue-500 text-white p-1 mx-1 my-1 rounded">{stack}</span>
                  ))}
                </div>
                <h3 className="font-bold h-24">{work.title}</h3>
                {/* <p className="text-sm">{work.text}</p> */}
                <small>{work.workDate}</small><br/>
                <small>{work.workPeriod}</small>
              </div>
            </Link>
          ))}
        </div>
      }
    </>
  );
}
