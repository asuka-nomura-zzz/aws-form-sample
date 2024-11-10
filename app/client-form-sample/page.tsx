'use client'

import Form from './components/Form';

const page = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="font-semibold text-lg mb-2">インフルエンサー招待小規模イベントの応募フォームの開発 （クライアントコンポーネントでデータ取得）</h2>
        <p className="text-sm">インフルエンサー招待イベント用の応募フォームを開発しました。多数のインフルエンサーに依頼メールを一斉に送り、応募フォームを通じて参加希望の時間帯を登録してもらうという仕組みの実装です。一見、Googleフォームで十分にも思えるものですが、各時間帯には定員があるため、応募が特定の時間帯に集中しないよう、ECサイトの在庫管理のように応募と連動して定員数を減らしていく仕組みが必要がありました。開発時間は短く、数日間での対応が求められたので、簡易的なフォームを作成しました。</p>

        <h4 className="font-semibold mt-4">ポイント</h4>
        <ul className="list-disc ml-4 text-sm">
          <li>ReactのuseStateを活用してクライアント側で状態管理を行い、useEffectを使ってページ読み込み時にバックエンドからデータを取得するクライアントサイドレンダリングを実装</li>
          <li>複数人が同時にフォームを送信する場合、ブラウザ側での在庫表示とデータベースの実在庫に違いが出る懸念があったため、フォーム送信の直前に改めてデータベースへフェッチして最新の在庫数を取得してから、データベースの更新を行う仕様にした</li>
          <li>簡易的なバックエンドとしてSupabaseを採用し、PostgreSQLのRLS機能を活用してアクセス制御を行った</li>
          <li>TypeScriptで静的テストを行い、Jestでコンポーネント単位のテストを実装した</li>
        </ul>
      </div>
      <Form />
    </div>
  )
}

export default page
