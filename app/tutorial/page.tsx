'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/createClient'

type Timeslot = {
  id: number;
  name: string;
  stock: number;
}

type Influencer = {
  name: string;
  kana_name: string;
  email: string;
  birthdate: string;
  is_attend: boolean;
  timeslot?: number;
  number_of_attendees?: number;
  first_companion_name?: string;
  second_companion_name?: string;
}

const page = () => {

  const [name, setName] = useState<string>('')
  const [kanaName, setKanaName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [birthdate, setBirthdate] = useState<string>(
    new Date(2000, 1, 1)
    .toLocaleDateString('ja-JP', {
      year: 'numeric', month: '2-digit', day: '2-digit'
    })
    .replaceAll('/', '-')
  )
  const [isAttend, setIsAttend] = useState<boolean>(false)
  const [timeslots, setTimeslots] = useState<Timeslot[] | null>([])
  const [numberOfAttendees, setNumberOfAttendees] = useState<string>('1')
  const [firstCompanionName, setFirstCompanionName] = useState<string>('')
  const [secondCompanionName, setSecondCompanionName] = useState<string>('')

  const [selectedTimeslots, setSelectedTimeslots] = useState<string>('1')

  let influencer: Influencer = {
    name: '花子',
    kana_name: 'はなこ',
    email: 'aaa@gmail.com',
    birthdate: '2000-01-01',
    is_attend: true,
    timeslot: 2,
    number_of_attendees: 3,
    first_companion_name: '太郎',
    second_companion_name: '次郎',
  };

  
  async function fetchData () {
    return await supabase.from('timeslots').select().gt('stock', 0).order('id')
  }

  async function postInfluencer (personInfo: Influencer) {
    await supabase.from('influencers').insert(personInfo)
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
        alert('not enough stock')
        return
      }
      await supabase
        .from('timeslots')
        .update({ stock: currentStock - Number(decreaseBy)})
        .eq('id', Number(timeslotId))
    }
  }

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // if (selectedTimeslots && numberOfAttendees) {
    //   await decreaseStock(selectedTimeslots, numberOfAttendees)
    // }
    await postInfluencer(influencer)
  }


  useEffect(() => {
    // const fetchAndAssign = async () => {
    //   const { data } = await fetchData()
    //   setTimeslots(data)
    // }

    // fetchAndAssign()
    fetchData().then((res) => setTimeslots(res.data))

    return () => {}
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

      <div className="w-full max-w-md mx-auto">

        <form 
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" 
          onSubmit={handleSubmit}
        >
          
          <div className="mb-6">
            <label htmlFor="name">名前</label>
            <input 
              type="text" 
              id="name"
              value={name} 
              className="w-full border invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
              required
            />   
          </div>

          <div className="mb-6">
            <label htmlFor="kanaName">読み仮名</label>
            <input 
              type="text" 
              id="kanaName"
              value={kanaName} 
              className="w-full border invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setKanaName(event.target.value)}
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="email">メールアドレス</label>
            <input 
              type="email" 
              id="email"
              value={email} 
              className="w-full border invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
              pattern="[\-a-zA-Z0-9~!$%^&amp;*_=+\}\{'?]+(\.[\-a-zA-Z0-9~!$%^&amp;*_=+\}\{'?]+)*@[a-zA-Z0-9_][\-a-zA-Z0-9_]*(\.[\-a-zA-Z0-9_]+)*\.[cC][oO][mM](:[0-9]{1,5})?"
              required
            />
            <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
              Please enter a valid email address
            </span>
          </div>

          <div className="mb-6">
            <label htmlFor="birthdate">生年月日</label>
            <input 
              type="date" 
              id="birthdate"
              value={birthdate} 
              className="w-full border invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setBirthdate(event.target.value)}
              required
            />        
          </div>

          <div className="mb-6">
            <label htmlFor="timeslot">時間帯</label>
            <select 
              id="timeslot" 
              className="w-full border" 
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setSelectedTimeslots(event.target.value)}
            >
              <option value="0">-</option>
              {timeslots?.map((timeslot: Timeslot)=>(
                <option key={timeslot.id} value={timeslot.id}>{timeslot.name}</option> 
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="numberOfAttendees">参加人数</label>
            <select
              id="numberOfAttendees"
              className="w-full border"
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setNumberOfAttendees(event.target.value)}
            >
              <option value="0">-</option>
              <option value="1">1名（ご本人様のみ）</option>
              <option value="2">2名（同伴者様1名）</option>
              <option value="3">3名（同伴者様2名）</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="1st">一人目の同行者様</label>
            <input 
              type="text" 
              id="1st" 
              value={firstCompanionName} 
              className="w-full border"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFirstCompanionName(event.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="2nd">二人目の同行者様</label>
            <input 
              type="text" 
              id="2nd"
              value={secondCompanionName} 
              className="w-full border"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSecondCompanionName(event.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="bg-blue-500 text-white mt-2 py-2 px-4 rounded cursor-pointer"
          >
            申し込む
          </button>
        </form>
      </div>
    </div>
  )
}

export default page
