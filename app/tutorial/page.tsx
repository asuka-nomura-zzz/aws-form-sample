"use client";

import React, { useState, useEffect } from "react";

// const db = { name: "junya", age: 39, email: "aaa@gmail.com" };

const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // setName(db.name)
    // setEmail(db.email)

    const fetchData = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const data = await res.json();

      console.log(data);

      setName(data.name);
      setEmail(data.email);
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
        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default page;
