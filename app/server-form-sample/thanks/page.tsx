import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <p>お申し込みありがとうございました</p>
      <div className='hover:underline'>
        <Link href="/">トップに戻る</Link>
      </div>
    </div>
  )
}

export default page