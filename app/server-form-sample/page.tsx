'use client'

import React from 'react'
import { useAppContext } from './context/useAppContext'

const page = () => {
  const { timeslots } = useAppContext()

  return (
    // <div>
    //   {timeslots.map((timeslot) => (
    //     <p>{timeslot.name}</p>
    //   ))}
    // </div>
    <>
      <p>this is server form top page</p>
    </>
  )
}

export default page