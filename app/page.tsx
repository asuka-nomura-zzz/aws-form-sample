'use client'

import Link from "next/link"
import { useState } from "react";
import { AnimateCardWrapper } from "./animation/AnimateCardWrapper";
import Animate from "./animation/Animate";
import { motion } from "framer-motion"

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
    stacks: ['Next.js', 'useEffect', 'useState', 'TailwindCSS', 'Supabase'],
    text: 'インフルエンサーイベントへの招待状サイト。当初はGoogleフォームを用いて簡易的にインフルエンサーへ希望時間の聞き取りをやる予定とのことだったが、5つに分かれているそれぞれの時間帯は、それぞれ参加数の上限があるため、上限にひっかからないように枠の在庫の制御を行う必要があった。そのため、ECサイトのように在庫データと連動させた応募フォームを作成する必要があり、依頼があった。開発時間は極めて短く、数日間のみ。データベースにSupabaseを使用。ReactのuseEffect関数でページレンダリングの際にバックエンドから在庫数を取得して、フロント側でレンダリングするという仕組みで開発をした。',
    url: '/client-form-sample',
    workDate: '2024.3',
    workPeriod: '3日間',
  },
  {
    id: 2,
    title: '【2回目】zod、React Hook Formを用いて、サーバーコンポーネントでデータを取得するようにした応募フォーム',
    stacks: ['Next.js', 'Tailwind CSS', 'Supabase'],
    text: '前回の案件の続きの案件。前回の反省から、フロント側での型のバリデーションを厳密にするため、zod、React Hook Formを使用。クライアント側でuseEffectでデータを取得するのではなく、あらかじめサーバーコンポーネント側でデータフェッチする仕組みに変更。フォーム送信前とフォーム送信後の確認画面も作成した。SupabaseではRLS(Row Level Security)を用いて、データの読み書きの安全性を高めた。',
    url: '/server-form-sample',
    workDate: '2024.6',
    workPeriod: '2週間',
  },
  {
    id: 3,
    title: '【3回目】AWSのAPI Gateway、Lambda、DynamoDBを用いて洗練させた応募フォーム',
    stacks: ['Next.js', 'Tailwind CSS', 'ログイン機能', 'Adminページ', 'API Gateway', 'Lambda', 'DynamoDB', 'Cognito'],
    text: '前回、前々回のフォームの続きの案件。前回までの仕事が好評だったため、大手シューズブランドが関わるより規模の大きいインフルエンサー招待イベントのフォーム開発を担当。大手フォットウェアブランドのセキュリティ要件を満たすため、バックエンド側をAWSのサーバーレスアーキテクチャで構築。通信時の暗号化としてはデフォルトでHTTPSのみを受け付けるAPI Gatewayでエンドポイントを作成し、保管時の暗号化にはデフォルトで暗号化が行われるDynamoDBを使用。当初はPostgreSQLを用いるためにAurora Serverlessを検討していたが、コスト増の懸念があったため、Key-value型のDynamoDBを採用した。',
    url: '/aws-form-sample',
    workDate: '2024.8',
    workPeriod: '1週間',
  },
  {
    id: 4,
    title: 'バックエンドを伴うコーポレートサイトの開発（ページ作成中）',
    stacks: ['Next.js', 'Tailwind CSS', 'ログイン機能', 'Adminページ', 'API Gateway', 'Lambda', 'DynamoDB', 'Cognito'],
    text: '前回、前々回のフォームの続きの案件。前回までの仕事が好評だったため、大手シューズブランドが関わるより規模の大きいインフルエンサー招待イベントのフォーム開発を担当。大手フォットウェアブランドのセキュリティ要件を満たすため、バックエンド側をAWSのサーバーレスアーキテクチャで構築。通信時の暗号化としてはデフォルトでHTTPSのみを受け付けるAPI Gatewayでエンドポイントを作成し、保管時の暗号化にはデフォルトで暗号化が行われるDynamoDBを使用。当初はPostgreSQLを用いるためにAurora Serverlessを検討していたが、コスト増の懸念があったため、Key-value型のDynamoDBを採用した。',
    url: '#',
    workDate: '2024.8',
    workPeriod: '1週間',
  },
  {
    id: 5,
    title: 'コスメECサイトのカスタムテーマ開発（ページ作成中）',
    stacks: ['Next.js', 'Tailwind CSS', 'ログイン機能', 'Adminページ', 'API Gateway', 'Lambda', 'DynamoDB', 'Cognito'],
    text: '前回、前々回のフォームの続きの案件。前回までの仕事が好評だったため、大手シューズブランドが関わるより規模の大きいインフルエンサー招待イベントのフォーム開発を担当。大手フォットウェアブランドのセキュリティ要件を満たすため、バックエンド側をAWSのサーバーレスアーキテクチャで構築。通信時の暗号化としてはデフォルトでHTTPSのみを受け付けるAPI Gatewayでエンドポイントを作成し、保管時の暗号化にはデフォルトで暗号化が行われるDynamoDBを使用。当初はPostgreSQLを用いるためにAurora Serverlessを検討していたが、コスト増の懸念があったため、Key-value型のDynamoDBを採用した。',
    url: '#',
    workDate: '2024.8',
    workPeriod: '1週間',
  },
  {
    id: 6,
    title: '社内利用向け請求書登録Webアプリの開発（ページ作成中）',
    stacks: ['Next.js', 'Tailwind CSS', 'ログイン機能', 'Adminページ', 'API Gateway', 'Lambda', 'DynamoDB', 'Cognito'],
    text: '前回、前々回のフォームの続きの案件。前回までの仕事が好評だったため、大手シューズブランドが関わるより規模の大きいインフルエンサー招待イベントのフォーム開発を担当。大手フォットウェアブランドのセキュリティ要件を満たすため、バックエンド側をAWSのサーバーレスアーキテクチャで構築。通信時の暗号化としてはデフォルトでHTTPSのみを受け付けるAPI Gatewayでエンドポイントを作成し、保管時の暗号化にはデフォルトで暗号化が行われるDynamoDBを使用。当初はPostgreSQLを用いるためにAurora Serverlessを検討していたが、コスト増の懸念があったため、Key-value型のDynamoDBを採用した。',
    url: '#',
    workDate: '2024.8',
    workPeriod: '1週間',
  },
]

const WorkCard = ({ work }: { work: Work }) => {
  return (
    <motion.div key={work.id} whileHover={{ scale: 1.05 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <Link href={work.url}>
        <div className="bg-gray-100 p-4">
          {/* <div className="flex flex-row flex-wrap items-center justify-center h-16">
            {work.stacks.map((stack, i) => (
              <span key={i} className="text-xs bg-blue-500 text-white p-1 mx-1 my-1 rounded">{stack}</span>
            ))}
          </div> */}
          <h3 className="font-bold h-24 text-sm">{work.title}</h3>
          {/* <small>{work.workDate}</small><br />
          <small>{work.workPeriod}</small> */}
        </div>
      </Link>
    </motion.div>
  )
};

export default function Home() {

  // const allStacks = ['すべて', 'React', 'Next.js', 'Tailwind CSS', 'API Gateway', 'Lambda', 'DynamoDB']

  // filtered works by technology stack used
  // const reactWorks = works.filter((work: Work) => {
  //   return work.stacks.includes('React')
  // })
  // const nextWorks = works.filter((work: Work) => {
  //   return work.stacks.includes('Next.js')
  // })
  // const tailwindWorks = works.filter((work: Work) => {
  //   return work.stacks.includes('Tailwind CSS')
  // })
  // const apiGatewayWorks = works.filter((work: Work) => {
  //   return work.stacks.includes('API Gateway')
  // })
  // const lambdaWorks = works.filter((work: Work) => {
  //   return work.stacks.includes('Lambda')
  // })
  // const dynamoDBWorks = works.filter((work: Work) => {
  //   return work.stacks.includes('DynamoDB')
  // })
  // const supabaseWorks = works.filter((work: Work) => {
  //   return work.stacks.includes('Supabase')
  // })
  // const zodWorks = works.filter((work: Work) => {
  //   return work.stacks.includes('zod')
  // })
  // const reactHookFormWorks = works.filter((work: Work) => {
  //   return work.stacks.includes('React Hook Form')
  // })

  const [selected, setSelected] = useState<string>('すべて');


  return (
    <div className="max-w-3xl mx-auto">
      {/* <Link href="./client-form-sample">
        <p className="flex justify-center py-4 hover:underline">Client Side Rendering</p>
      </Link>
      <Link href="./server-form-sample/invitation">
        <p className="flex justify-center py-4 hover:underline">Server Side Rendering</p>
      </Link> */}

      <div className="flex flex-row gap-8 items-center justify-center mb-8">
        <div className="">
          <small>のむら あすか</small>
          <h2 className="text-2xl font-semibold">野村 愛朱歌<span className="ml-4 font-semibold text-sm">Asuka Nomura</span></h2>
          <p className="mt-4">フロントエンドエンジニアで、React、Next.jsやAWSのサーバーレスフレームワークを得意としています。</p>
        </div>
      </div>

      <h3 className="font-bold text-xl mb-4">Certifications</h3>
      <ul className="list-disc mb-8">
        <li className="ml-4">TOEIC 830点  取得<span className="ml-6 text-sm">2022年</span></li>
        <li className="ml-4">宅地建物取引士試験  合格<span className="ml-6 text-sm">2023年</span></li>
        <li className="ml-4">AWS Certified Solutions Architect - Associates  取得<span className="ml-6 text-sm">2024年</span></li>
        <li className="ml-4">LPIC-1  取得<span className="ml-6 text-sm">2024年</span></li>
      </ul>

      <h3 className="font-bold text-xl mb-4">Works</h3>

      {/* {allStacks.map((link) => (
        <button key={link} onClick={() => setSelected(link)} className="bg-gray-300 p-1 mb-4 mx-2 rounded-lg">{link}</button>
      ))} */}

      {selected === 'すべて' &&
        <AnimateCardWrapper className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {works.map((work) => (
            <Animate key={work.id}>
              <WorkCard work={work} />
            </Animate>
          ))}
        </AnimateCardWrapper>
      }

      {/* {selected === 'React' &&
        <AnimateCardWrapper className="grid grid-cols-3 gap-4">
          {reactWorks.map((work) => (
            <Animate key={work.id}>
              <WorkCard work={work} />
            </Animate>
          ))}
        </AnimateCardWrapper>
      }

      {selected === 'Next.js' &&
        <AnimateCardWrapper className="grid grid-cols-3 gap-4">
          {nextWorks.map((work) => (
            <Animate key={work.id}>
              <WorkCard work={work} />
            </Animate>
          ))}
        </AnimateCardWrapper>
      }

      {selected === 'Tailwind CSS' &&
        <AnimateCardWrapper className="grid grid-cols-3 gap-4">
          {tailwindWorks.map((work) => (
            <Animate key={work.id}>
              <WorkCard work={work} />
            </Animate>
          ))}
        </AnimateCardWrapper>
      }

      {selected === 'API Gateway' &&
        <AnimateCardWrapper className="grid grid-cols-3 gap-4">
          {apiGatewayWorks.map((work) => (
            <Animate key={work.id}>
              <WorkCard work={work} />
            </Animate>
          ))}
        </AnimateCardWrapper>
      }

      {selected === 'Lambda' &&
        <AnimateCardWrapper className="grid grid-cols-3 gap-4">
          {lambdaWorks.map((work) => (
            <Animate key={work.id}>
              <WorkCard work={work} />
            </Animate>
          ))}
        </AnimateCardWrapper>
      }

      {selected === 'DynamoDB' &&
        <AnimateCardWrapper className="grid grid-cols-3 gap-4">
          {dynamoDBWorks.map((work) => (
            <Animate key={work.id}>
              <WorkCard work={work} />
            </Animate>
          ))}
        </AnimateCardWrapper>
      } */}

    </div>
  );
}
