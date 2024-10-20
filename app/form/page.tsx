"use client"
import React, { useState, useEffect } from 'react'

const page = () => {
  const [name, setName] = useState("Hanako");
  
  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/users/1")
    //   .then((res) => res.json())
    //   .then((data) => setName(data.name))


    const fetchData = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1")
      const data = await res.json()
      setName(data.name)
    } //declare

    fetchData()  //call

  },[])

  return (
    <div>
      {name}
      <form>
        <input type="text" className="border" onChange={(event) => setName(event.target.value)}/>
        <button type="submit" className="bg-blue-200">送信</button>
      </form>
    </div>
  )
}

export default page
