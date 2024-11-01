import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/createClient';
import FormInput from './FormInput';
import SelectInput from './SelectInput';
import CheckboxInput from './CheckboxInput';
import CompanionInputs from './CompanionInputs';
import TimeslotSelect from './TimeslotSelect';
import { Timeslot } from '../types/Timeslot';
import { Influencer } from '../types/Influencer';
import Link from 'next/link';

const Form = () => {
  const [fullName, setFullName] = useState<string>('')
  const [kanaName, setKanaName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [birthdate, setBirthdate] = useState<string>(
    new Date(2000, 0, 1)
    .toLocaleDateString('ja-JP', {
      year: 'numeric', month: '2-digit', day: '2-digit'
    })
    .replaceAll('/', '-')
  )
  const [isAttend, setIsAttend] = useState<boolean>(false)
  const [timeslots, setTimeslots] = useState<Timeslot[]>([])
  const [numberOfAttendees, setNumberOfAttendees] = useState<string>('0')
  const [firstCompanionName, setFirstCompanionName] = useState<string>('')
  const [secondCompanionName, setSecondCompanionName] = useState<string>('')
  const [selectedTimeslot, setSelectedTimeslot] = useState<string>('1')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  let influencer: Influencer = {
    full_name: fullName,
    kana_name: kanaName,
    email: email,
    birthdate: birthdate,
    is_attend: isAttend,
    timeslot: Number(selectedTimeslot),
    number_of_attendees: Number(numberOfAttendees),
    first_companion_name: firstCompanionName,
    second_companion_name: secondCompanionName,
  };

  async function fetchData(): Promise<Timeslot[]> {
    const { data, error } = await supabase
      .from('timeslots')
      .select()
      .gt('stock', 0)
      .order('id')
  
    if (error) {
      console.error("データの取得中にエラーが発生しました:", error)
      alert("データの取得に失敗しました。再度お試しください。")
      return []
    }
  
    // データをTimeslot型にマッピング
    return (data ?? []).map(item => ({
      id: item.id as number,
      name: item.name as string,
      stock: item.stock as number,
    }));
  }

  async function postInfluencer(personInfo: Influencer): Promise<void> {
    try {
      const { error } = await supabase.from('influencers').insert(personInfo)
      if (error) {
        console.error("データの送信中にエラーが発生しました:", error)
      } else {
        console.log("インフルエンサー情報が正常に登録されました。")
      }
    } catch (error) {
      console.error("予期しないエラーが発生しました:", error)
    }
  }

  async function decreaseStock (timeslotId: string, decreaseBy: string) {
    try {
      const fetchedData = await fetchData()
      const filteredTimeslot = fetchedData?.find((timeslot) => {
        return timeslot.id === Number(timeslotId)
      })
      console.log(filteredTimeslot)
  
      if (!filteredTimeslot) {
        return;
      }
  
      const currentStock = filteredTimeslot.stock
      
      if (currentStock < Number(decreaseBy)) {
        console.log('not enough stock')
        return
      }
  
      const { error } = await supabase
        .from('timeslots')
        .update({ stock: currentStock - Number(decreaseBy)})
        .eq('id', Number(timeslotId))
      
      if (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      if (selectedTimeslot && numberOfAttendees) {
        await decreaseStock(selectedTimeslot, numberOfAttendees)
      }
      await postInfluencer(influencer)
      setFullName('')
      setKanaName('')
      setEmail('')
      setBirthdate('')
      setIsAttend(false)
      setSelectedTimeslot('1')
      setNumberOfAttendees('0')
      setFirstCompanionName('')
      setSecondCompanionName('')
      setIsSubmitted(true)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchAndAssign = async () => {
      try {
        const timeslotArray = await fetchData();
        setTimeslots(timeslotArray); // Timeslot型の配列をそのまま設定
      } catch (error) {
        console.error("データの取得中にエラーが発生しました", error);
      }
    };
  
    fetchAndAssign();
  }, []);


  return (
    <div>
      {isSubmitted ? 
      <>
        <p>送信ありがとうございました</p>
        <Link href="./">
          <p className='hover:underline'>TOPへ戻る</p>
         </Link>
      </>
      :
      <form onSubmit={handleSubmit}>
        <FormInput label="名前" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <FormInput label="読み仮名" value={kanaName} onChange={(e) => setKanaName(e.target.value)} />
        <FormInput label="メールアドレス" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
        <FormInput label="生年月日" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} type="date" />
        
        <CheckboxInput label="参加しますか？" checked={isAttend} onChange={() => setIsAttend(!isAttend)} />
        
        {isAttend && (
          <>
            <TimeslotSelect timeslots={timeslots} onChange={(e) => setSelectedTimeslot(e.target.value)} />
            <SelectInput 
              label="参加人数"
              options={[
                { value: '0', label: '-' },
                { value: '1', label: '1名（ご本人様のみ）' },
                { value: '2', label: '2名（同伴者様1名）' },
                { value: '3', label: '3名（同伴者様2名）' },
              ]}
              onChange={(e) => setNumberOfAttendees(e.target.value)}
            />
            <CompanionInputs
              numberOfAttendees={Number(numberOfAttendees)}
              firstCompanionName={firstCompanionName}
              setFirstCompanionName={setFirstCompanionName}
              secondCompanionName={secondCompanionName}
              setSecondCompanionName={setSecondCompanionName}
            />
          </>
        )}

        <button type="submit" className="bg-blue-500 text-white mt-2 py-2 px-4 rounded cursor-pointer">申し込む</button>
      </form>
      }

        <Link href="./">
         <p className='my-10 hover:underline'>TOPへ戻る</p>
        </Link>
        
    </div>
  );
};

export default Form;
