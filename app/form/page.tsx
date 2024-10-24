"use client"

import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/createClient'

const page = () => {
  const [name, setName] = useState("Hanako");
  const [sections, setSections] = useState<any[] | null>([]);
  const [selectedSection, setSelectedSection] = useState("")
  
  async function fetchData () {
    return await supabase.from("timeslots").select();
  }

  async function decreaseStock (sectionId: string) {
    const { data } = await fetchData()
    const filtered = data?.filter((item) => {
      return item.id === Number(sectionId)
    })

    if (filtered) {
      const currentStock = filtered[0].stock
      await supabase
        .from("timeslots")
        .update({ stock: currentStock - 1 })
        .eq("id", Number(sectionId))
    }
  }

  async function submitHandler (event: any) {
    event.preventDefault()
    if (selectedSection) {
      await decreaseStock(selectedSection)
    }
  }

  
  useEffect(() => {
    const fetchAndAssign = async () => {
      const { data } = await fetchData()
      setSections(data)
    }

    fetchAndAssign()
  },[])

  return (
    <div>

      <p>{name}が選択されています</p>
      <p>{selectedSection}が選択されています</p>

      <div className="w-full max-w-xs mx-auto">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>

          <input type="text" className="w-full border" onChange={(event) => setName(event.target.value)}/>
          <br />

          <input type="text" className="w-full border"/>

          <select className="w-full border" onChange={(event) => setSelectedSection(event.target.value)}>
            {sections?.map((section)=>(
              <option key={section.id} value={section.id}>{section.name} : {section.stock}</option> 
          ))}
          </select>

          <button type="submit" className="bg-blue-200 mt-2 py-2 px-4 rounded">送信</button>
        </form>

      </div>

    </div>
  )
}

export default page
