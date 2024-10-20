import React from 'react'
import Link from "next/link"

const page = () => {
  return (
    <div>
      about
      <Link href="/about/favorite" className="bg-blue-200">favorite</Link>
    </div>
  )
}

export default page
