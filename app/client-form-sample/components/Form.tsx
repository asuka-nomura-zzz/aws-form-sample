import React, { useState, useEffect } from 'react';
import FormInput from './FormInput';
import SelectInput from './SelectInput';
import CheckboxInput from './CheckboxInput';
import CompanionInputs from './CompanionInputs';
import TimeslotSelect from './TimeslotSelect';
import { Timeslot } from '../../types/Timeslot';
import { Influencer } from '../../types/Influencer';
import { postInfluencer } from '../../utils/postInfluencer';
import { decreaseStock } from '../../utils/decreaseStock';
import { getTimeslots } from '../../utils/getTimeslots';
import Link from 'next/link';

const Form = () => {
  const [fullName, setFullName] = useState<string>('')
  const [kanaName, setKanaName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [birthdate, setBirthdate] = useState<string>('2000-01-01')
  const [isAttend, setIsAttend] = useState<boolean>(false)
  const [timeslots, setTimeslots] = useState<Timeslot[]>([])
  const [numberOfAttendees, setNumberOfAttendees] = useState<string>('0')
  const [firstCompanionName, setFirstCompanionName] = useState<string>('')
  const [secondCompanionName, setSecondCompanionName] = useState<string>('')
  const [selectedTimeslot, setSelectedTimeslot] = useState<string>('1')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  
  async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const influencer: Influencer = {
      full_name: fullName,
      kana_name: kanaName,
      email: email,
      birthdate: birthdate,
      is_attend: isAttend,
      timeslot: Number(selectedTimeslot),
      number_of_attendees: Number(numberOfAttendees),
      first_companion_name: firstCompanionName,
      second_companion_name: secondCompanionName,
    }

    try {
      if (selectedTimeslot && numberOfAttendees) {
        await decreaseStock(selectedTimeslot, numberOfAttendees)
      }
      await postInfluencer(influencer)
      
      // clear states with initial values
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
        const fetchedTimeslots = await getTimeslots()
        setTimeslots(fetchedTimeslots)
      } catch (error) {
        console.error("error caught", error)
      }
    };
  
    fetchAndAssign()
  }, []);

  return (
    <>
      {isSubmitted ? 
      <>
        <p>送信ありがとうございました</p>
        <Link href="/" className="hover:underline">TOPへ戻る</Link>
      </>
      :
      <form onSubmit={handleSubmit}>
        <FormInput label="名前" value={fullName} onChange={(event) => setFullName(event.target.value)} />
        <FormInput label="読み仮名" value={kanaName} onChange={(event) => setKanaName(event.target.value)} />
        <FormInput label="メールアドレス" value={email} onChange={(event) => setEmail(event.target.value)} type="email" />
        <FormInput label="生年月日" value={birthdate} onChange={(event) => setBirthdate(event.target.value)} type="date" />
        
        <CheckboxInput label="参加しますか？" checked={isAttend} onChange={() => setIsAttend(!isAttend)} />
        
        {isAttend && (
          <>
            <TimeslotSelect timeslots={timeslots} onChange={(event) => setSelectedTimeslot(event.target.value)} />
            <SelectInput 
              label="参加人数"
              options={[
                { value: '0', label: '-' },
                { value: '1', label: '1名（ご本人様のみ）' },
                { value: '2', label: '2名（同伴者様1名）' },
                { value: '3', label: '3名（同伴者様2名）' },
              ]}
              onChange={(event) => setNumberOfAttendees(event.target.value)}
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

        <div className="flex flex-row items-center justify-center gap-8 mt-4">
          <Link href="/" className="hover:underline">TOPへ戻る</Link>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 duration-200">送信する</button>
        </div>
      </form>
      }        
    </>
  );
};

export default Form;
