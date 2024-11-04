import Link from "next/link"
export default function Home() {
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

      <div className="grid grid-cols-3 gap-4">
        <Link href="/client-form-sample">
          <div className="bg-gray-100 p-4 h-32">
            <h3 className="font-bold">Client Side Rendering</h3>
            <p>このフォームはクライアントでの送信フォームです</p>
          </div>
        </Link>

        <Link href="/server-form-sample">
          <div className="bg-gray-100 p-4 h-32">
            <h3 className="font-bold">Server Side Rendering</h3>
            <p>このフォームはサーバー側でデータを取得しました</p>
          </div>
        </Link>

        <Link href="/aws-form-sample">
          <div className="bg-gray-100 p-4 h-32">
            <h3 className="font-bold">Server Side & AWS</h3>
            <p>このフォームはApi Gateway、Lambda、DynamoDBを用いてロジックを作成しました</p>
          </div>
        </Link>
      </div>
    </>
  );
}
