"use client"

import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/createClient'

const page = () => {
  const [name, setName] = useState("Hanako");
  const [sections, setSections] = useState<any[] | null>([]);
  const [selectedSection, setSelectedSection] = useState("")

  const submitHandler = (event: any) => {
    event.preventDefault()
    console.log("submitted")
    //選択されているタイムスロットのIDを取得
    //そのIDと一致するデータベースのストックを任意の数減らす
  }

  const decreaseStock = () => {
    
  }

  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/users/1")
    //   .then((res) => res.json())
    //   .then((data) => setName(data.name))

    const fetchData = async () => {
      // const res = await fetch("https://jsonplaceholder.typicode.com/users/1")
      // const data = await res.json()
      // setName(data.name)
      // const { data } = await supabase.from("sections").select();
      const { data } = await supabase.from("timeslots").select();

      setSections(data)
    } //declare

    fetchData()  //call

  },[])

  return (
    <div>

      <p>{name}</p>
      <p>{selectedSection}</p>

      <form onSubmit={submitHandler}>
        <input type="text" className="border" onChange={(event) => setName(event.target.value)}/>
        <select onChange={(event) => setSelectedSection(event.target.value)}>
          {sections?.map((section)=>(
            <option key={section.id}>{section.name} : {section.stock}</option> 
        ))}
        </select>
        <button type="submit" className="bg-blue-200">送信</button>
      </form>

    </div>
  )
}

export default page
