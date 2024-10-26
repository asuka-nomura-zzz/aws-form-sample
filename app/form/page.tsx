"use client"

import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/createClient'

const page = () => {

  const [name, setName] = useState("")
  const [kanaName, setKanaName] = useState("")
  const [birthdate, setBirthdate] = useState(
    new Date(2000, 1, 1)
    .toLocaleDateString("ja-JP", {
      year: "numeric", month: "2-digit", day: "2-digit"
    })
    .replaceAll("/", "-")
  )
  const [firstCompanionName, setFirstCompanionName] = useState("")
  const [secondCompanionName, setSecondCompanionName] = useState("")
  const [email, setEmail] = useState("")


  const [timeslots, setTimeslots] = useState<any[] | null>([])
  const [selectedTimeslots, setSelectedTimeslots] = useState("1")
  const [numberOfAttendees, setNumberOfAttendees] = useState("1")


  async function fetchData () {
    return await supabase.from("timeslots").select().gt("stock", 0).order("id");
  }


  async function decreaseStock (timeslotId: string, decreaseBy: string) {
    const { data } = await fetchData()

    const filteredTimeslot = data?.filter((timeslot) => {
      return timeslot.id === Number(timeslotId)
    })
    console.log(filteredTimeslot)

    if (filteredTimeslot) {
      const currentStock = filteredTimeslot[0].stock
      
      if (currentStock < Number(decreaseBy)) {
        alert("Not enough stock")
        return
      }
      await supabase
      .from("timeslots")
      .update({ stock: currentStock - Number(decreaseBy)})
      .eq("id", Number(timeslotId))
    }
  }

  async function submitHandler (event: any) {
    event.preventDefault()
    if (selectedTimeslots && numberOfAttendees) {
      await decreaseStock(selectedTimeslots, numberOfAttendees)
    }
  }


  useEffect(() => {
    const fetchAndAssign = async () => {
      const { data } = await fetchData()
      setTimeslots(data)
    }

    fetchAndAssign()
  },[])

  return (
    <div>

      <p>名前は{name}</p>
      <p>よみがなは{kanaName}</p>
      <p>emailは{email}</p>
      <p>生年月日は{birthdate}</p>
      <p>1人目の同行者は{firstCompanionName}</p>
      <p>2人目の同行者は{secondCompanionName}</p>

      <p>{selectedTimeslots}が選択されています</p>
      <p>{numberOfAttendees}</p>

      <div className="w-full max-w-xs mx-auto">

        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>
          
          <div className='mb-6'>
            <label htmlFor="name">名前</label>
            <input id="name" value={name} type="text" onChange={(event) => setName(event.target.value)}/>   
          </div>

          <div className='mb-6'>
            <label htmlFor="kanaName">読み仮名</label>
            <input id="kanaName" value={kanaName} type="text" onChange={(event) => setKanaName(event.target.value)}/>
          </div>
          
          <div className='mb-6'>
            <label htmlFor="email">メールアドレス</label>
            <input id="email" value={email} type="text" onChange={(event) => setEmail(event.target.value)}/>
          </div>

          <div className='mb-6'>
            <label htmlFor="birthdate">生年月日</label>
            <input id="birthdate" value={birthdate} type="date" onChange={(event) => setBirthdate(event.target.value)}/>        
          </div>

          <div className="mb-6">
            <label htmlFor="1st">一人目の同行者</label>
            <input id="1st" value={firstCompanionName} type="text" onChange={(event) => setFirstCompanionName(event.target.value)}/>
          </div>

          <div className="mb-6">
            <label htmlFor="2nd">二人目の同行者</label>
            <input id="2nd" value={secondCompanionName} type="text" onChange={(event) => setSecondCompanionName(event.target.value)}/>
          </div>
          <div className="mb-6">

          </div>
          <div className="mb-6"></div>
            <select className="w-full border" onChange={(event) => setNumberOfAttendees(event.target.value)}>
              <option value="1">1名</option>
              <option value="2">2名</option>
              <option value="3">3名</option>
            </select>

          <div className="mb-6">
            <select className="w-full border" onChange={(event) => setSelectedTimeslots(event.target.value)}>
              <option value="0">-</option>
              {timeslots?.map((timeslot)=>(
                <option key={timeslot.id} value={timeslot.id}>{timeslot.name}</option> 
              ))}
            </select>
          </div>




          <button type="submit" className="bg-blue-200 mt-2 py-2 px-4 rounded cursor-pointer">申し込む</button>

        </form>

      </div>

    </div>
  )
}

export default page
