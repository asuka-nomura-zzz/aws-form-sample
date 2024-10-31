'use client'

import React, { useState } from 'react'
import { useAppContext } from './context/useAppContext'

const page = () => {
  // const { timeslots } = useAppContext()


  const articles = [
    {id: 1, title: "aaaa", category: "game"},
    {id: 2, title: "bbbb", category: "hobby"},
    {id: 3, title: "cccc", category: "music"},
    {id: 4, title: "dddd", category: "game"},
    {id: 5, title: "eeee", category: "hobby"},
  ]


  const gameArticles = articles.filter((article) => {
    return article.category === "game"
  })
  const hobbyArticles = articles.filter((article) => {
    return article.category === "hobby"
  })

  const musicArticles = articles.filter((article) => {
    return article.category === "music"
  })

  const [category, setCategory] = useState("all");



  return (
    <div>
      <button onClick={() => setCategory("all")}>all</button>
      <button onClick={() => setCategory("game")}>game</button>
      <button onClick={() => setCategory("hobby")}>hobby</button>
      <button onClick={() => setCategory("music")}>music</button>


      {
        category === "all" &&
        articles.map((article) => (
          <p>{article.title} / {article.category}</p>
        ))
      }

      {
        category === "game" &&
        gameArticles.map((article) => (
          <p>{article.title} / {article.category}</p>
        ))
      }


    </div>
  )
}

export default page