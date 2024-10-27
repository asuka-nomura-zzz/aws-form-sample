'use client'

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/createClient';

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

const Page = () => {
  const [name, setName] = useState<string>('');
  const [kanaName, setKanaName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>(
    new Date(2000, 1, 1)
      .toLocaleDateString('ja-JP', {
        year: 'numeric', month: '2-digit', day: '2-digit'
      })
      .replaceAll('/', '-')
  );
  const [isAttend, setIsAttend] = useState<boolean>(false);
  const [timeslots, setTimeslots] = useState<Timeslot[]>([]); // 修正
  const [numberOfAttendees, setNumberOfAttendees] = useState<string>('1');
  const [firstCompanionName, setFirstCompanionName] = useState<string>('');
  const [secondCompanionName, setSecondCompanionName] = useState<string>('');
  const [selectedTimeslots, setSelectedTimeslots] = useState<string>('1');

  const influencer: Influencer = {
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

  async function fetchData() {
    const { data } = await supabase.from('timeslots').select().gt('stock', 0).order('id');
    return data; // データを返す
  }

  async function postInfluencer(personInfo: Influencer) {
    await supabase.from('influencers').insert(personInfo);
  }

  async function decreaseStock(timeslotId: string, decreaseBy: string) {
    const data = await fetchData();
    const filteredTimeslot = data?.filter((timeslot) => timeslot.id === Number(timeslotId));
    
    if (filteredTimeslot && filteredTimeslot.length > 0) {
      const currentStock = filteredTimeslot[0].stock;

      if (currentStock < Number(decreaseBy)) {
        alert('not enough stock');
        return;
      }
      await supabase
        .from('timeslots')
        .update({ stock: currentStock - Number(decreaseBy) })
        .eq('id', Number(timeslotId));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // if (selectedTimeslots && numberOfAttendees) {
    //   await decreaseStock(selectedTimeslots, numberOfAttendees);
    // }
    await postInfluencer(influencer);
  }

  useEffect(() => {
    const fetchAndAssign = async () => {
      const data = await fetchData();
      setTimeslots(data || []); // null 対策
    };

    fetchAndAssign();
  }, []);

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
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          {/* ... フォーム内容 ... */}

          <div className="mb-6">
            <label htmlFor="timeslot">時間帯</label>
            <select
              id="timeslot"
              className="w-full border"
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setSelectedTimeslots(event.target.value)}
            >
              <option value="0">-</option>
              {timeslots.map((timeslot: Timeslot) => (
                <option key={timeslot.id} value={timeslot.id}>{timeslot.name}</option>
              ))}
            </select>
          </div>

          {/* ... 残りのフォーム内容 ... */}

          <button type="submit" className="bg-blue-500 text-white mt-2 py-2 px-4 rounded cursor-pointer">
            申し込む
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
