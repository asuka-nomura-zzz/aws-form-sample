"use client";

import React, { useState, useEffect } from "react";
import { supabase } from '../lib/createClient';

// const db = { name: "junya", age: 39, email: "aaa@gmail.com" };

const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedSection, setSelectedSection] = useState("")

  const [sections, setSections] = useState<any[] | null>([])

  useEffect(() => {
    // setName(db.name)
    // setEmail(db.email)

    const fetchData = async () => {
      // const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
      // const data = await res.json();

      const { data } = await supabase.from('sections').select('*')
      console.log(data);

      // setName(data.name);
      // setEmail(data.email);
      setSections(data)
    };

    fetchData();

    return () => {};
  }, []);

  function handleSubmit(e: any) {
    // e.preventDefault()
    console.log("submitted");
  }

  return (
    <div>
      <p>{name}</p>
      <p>{email}</p>
      {selectedSection && <p>選ばれているものは{selectedSection}</p>}
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

        <select onChange={(e) => setSelectedSection(e.target.value)}>
          {sections?.map((section: any) => (
            <option key={section.id}>{section.name}: {section.stock}枠</option>
          ))}
        </select>
        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default page;
