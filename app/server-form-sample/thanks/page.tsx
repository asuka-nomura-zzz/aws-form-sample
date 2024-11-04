import React from 'react'
import Link from 'next/link'
const page = () => {
  return (
    <>
      <p>お申し込みありがとうございました</p>
      <div className='hover:underline'>
        <Link href="/">トップに戻る</Link>
      </div>
    </>
  )
}

export default page