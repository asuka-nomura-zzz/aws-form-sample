"use client"

import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/createClient'

const page = () => {

  const [fruits, setFruits] = useState<any[] | null>([])
  const [selectedFruit, setSelectedFruit] = useState("")
  const [numberOfOrders, setNumberOfOrders] = useState("0")


  async function fetchData () {
    return await supabase.from("fruitstable").select().gt("stock", 0);
  }


  async function decreaseStock (fruitId: string, decreaseBy: string) {
    const { data } = await fetchData()

    const filteredFruits = data?.filter((fruit) => {
      return fruit.id === Number(fruitId)
    })
    console.log(filteredFruits)

    if (filteredFruits) {
      const currentStock = filteredFruits[0].stock
      await supabase
      .from("fruitstable")
      .update({ stock: currentStock - Number(decreaseBy)})
      .eq("id", Number(fruitId))
    }
  }

  async function submitHandler (event: any) {
    event.preventDefault()
    if (selectedFruit && numberOfOrders) {
      await decreaseStock(selectedFruit, numberOfOrders)
    }
  }


  useEffect(() => {
    const fetchAndAssign = async () => {
      const { data } = await fetchData()
      setFruits(data)
    }

    fetchAndAssign()
  },[])

  return (
    <div>

      <p>{selectedFruit}が選択されています</p>
      <p>{numberOfOrders}</p>

      <div className="w-full max-w-xs mx-auto">

        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>

          <select className="w-full border" onChange={(event) => setNumberOfOrders(event.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>

          <select className="w-full border" onChange={(event) => setSelectedFruit(event.target.value)}>
            {fruits?.map((fruit)=>(
              <option key={fruit.id} value={fruit.id}>{fruit.name}</option> 
            ))}
          </select>

          <button type="submit" className="bg-blue-200 mt-2 py-2 px-4 rounded">注文する</button>
        </form>

      </div>

    </div>
  )
}

export default page
