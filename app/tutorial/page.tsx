"use client"

import React, { useState, useEffect } from "react"
import { supabase } from '../lib/createClient'

const page = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [sections, setSections] = useState<any[] | null>([])
  const [selectedSectionId, setSelectedSectionId] = useState("")

  async function fetchData() {
    return await supabase.from('sections').select('*')
  }

  async function decreaseStock(sectionId: string, decreaseBy: number) {
    const getCurrentStock = async () => {
      const { data } = await fetchData()
      const selectedSectionStocks: any[] | undefined = data?.filter((section) => {
        return section.id === Number(sectionId)
      })

      if (selectedSectionStocks) {
        console.log(selectedSectionStocks[0].stock)
        return selectedSectionStocks[0].stock
      }

      return null
    }

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
    fetchAndUpdateData()

    console.log('stock decreased')
  }

  async function handleSubmit(e: any) {
    e.preventDefault()
    await decreaseStock(selectedSectionId, 1)
    console.log('decreasesStock called')
  }

  useEffect(() => {
    const fetchAndUpdateData = async () => {
      const { data } = await fetchData()
      setSections(data)
    }
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
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="border"
          onChange={(e) => setEmail(e.target.value)}
        />

        <select onChange={(e) => setSelectedSectionId(e.target.value)}>
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
