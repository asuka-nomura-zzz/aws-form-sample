'use client'
import { useState, useEffect } from 'react'
import { createContext, useContext, FC, PropsWithChildren } from 'react'
import { Timeslot } from '@/app/types/Timeslot';
import { getTimeslotsFromAws } from '../utils/getTimeslotsFromAws';

export const AppContext = createContext<{
  timeslots: Timeslot[],
  timeslotsFromAws: Timeslot[],

  //for ISR
  refreshTimeslots: () => void,
}>({
  timeslots: [],
  timeslotsFromAws: [],

  //for ISR
  refreshTimeslots: () => {}
});

export const AppWrapper: FC<PropsWithChildren<{
  timeslots: Timeslot[],
  timeslotsFromAws: Timeslot[]
}>> = ({ timeslots, timeslotsFromAws, children }) => {

  //for ISR
  const [timeslotsState, setTimeslotsState] = useState<Timeslot[]>(timeslots)
  const [timeslotsFromAwsState, setTimeslotsFromAwsState] = useState<Timeslot[]>(timeslotsFromAws)

  //for ISR
  useEffect(() => {
    const fetchTimeslots = async () => {
      const newTimeslots = await getTimeslotsFromAws()
      setTimeslotsFromAwsState(newTimeslots)
    }

    fetchTimeslots()

    // data update once every 20 seconds
    const intervalId = setInterval(fetchTimeslots, 20000)
    return () => clearInterval(intervalId)
  }, [])

  //for ISR
  const refreshTimeslots = () => {
    setTimeslotsState(timeslotsState)
    setTimeslotsFromAwsState(timeslotsFromAwsState)
  }

  return (
    <AppContext.Provider value={{
      timeslots: timeslotsState, 
      timeslotsFromAws: timeslotsFromAwsState, 
      
      //for ISR
      refreshTimeslots
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}