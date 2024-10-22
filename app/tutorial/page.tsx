"use client"

import React, { useState, useEffect } from "react"
import { supabase } from '../lib/createClient'

const page = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [sections, setSections] = useState<any[] | null>([])
  const [selectedSectionId, setSelectedSectionId] = useState("")

  // function definition only for fetching data
  async function fetchData() {
    return await supabase.from('sections').select('*')
  }

  // function definition for decreasing the number of stocks in the db
  async function decreaseStock(sectionId: string, decreaseBy: number) {
    
    // function definition for getting the newest value from db
    const getCurrentStock = async () => {
      // data fetched first
      const { data } = await fetchData()

      // filtered rows returned and it is assigned into a variable 
      const selectedSectionStocks: any[] | undefined = data?.filter((section) => {
        return section.id === Number(sectionId)
      })

      
      if (selectedSectionStocks) {
        // data type is an array even though the number of data should be 1
        return selectedSectionStocks[0].stock
      }

      // if there is no data, null will be returned
      return null
    }

    // call here
    const stockNow: number | null = await getCurrentStock()

    if (stockNow && typeof(stockNow) === 'number') {
      await supabase
        .from('sections')
        .update({ stock: stockNow - decreaseBy })
        .match({ id: sectionId })
    }

    const fetchAndUpdateData = async () => {
      const { data } = await fetchData()
      setSections(data)
    }
    //call here
    fetchAndUpdateData()
  }

  // function definition for updating db based on the value user submits
  async function handleSubmit(e: any) {
    e.preventDefault()
    await decreaseStock(selectedSectionId, 1)
    console.log('decreasesStock called')
  }

  useEffect(() => {
    // function definition for fetching data from db and assign it to a variable using useState
    const fetchAndUpdateData = async () => {
      const { data } = await fetchData()
      setSections(data)
    }
    // call here
    fetchAndUpdateData()

    return () => {}
  }, [])

  return (
    <div>
      <p>{name}</p>
      <p>{email}</p>
      {selectedSectionId && <p>選ばれているものは{selectedSectionId}</p>}
      <div>
        {sections && sections.map((section) => (
          <p key={section.id}>{section.name}: {section.stock}枠</p>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
        <input
          type="text"
          className="border"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedSectionId(e.target.value)}>
          {sections?.map((section: any) => (
            <option key={section.id} value={section.id}>{section.name}: {section.stock}枠</option>
          ))}
        </select>
        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default page
