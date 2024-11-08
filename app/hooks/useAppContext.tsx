'use client'
import { useState, useEffect } from 'react'
import { createContext, useContext, FC, PropsWithChildren } from 'react'
import { Timeslot } from '@/app/types/Timeslot';
import { getTimeslotsFromAws } from '../utils/getTimeslotsFromAws';
import { Influencer } from '../types/Influencer';
import { getInfluencersFromAws } from '../utils/getInfluencers';

export const AppContext = createContext<{
  timeslots: Timeslot[],
  timeslotsFromAws: Timeslot[],
  influencersFromAws: Influencer[],

  //for ISR
  refreshTimeslots: () => void,
}>({
  timeslots: [],
  timeslotsFromAws: [],
  influencersFromAws: [],

  //for ISR
  refreshTimeslots: () => {}
});

export const AppWrapper: FC<PropsWithChildren<{
  timeslots: Timeslot[],
  timeslotsFromAws: Timeslot[]
  influencersFromAws: Influencer[]
}>> = ({ timeslots, timeslotsFromAws, influencersFromAws, children }) => {

  //for ISR
  const [timeslotsState, setTimeslotsState] = useState<Timeslot[]>(timeslots)
  const [timeslotsFromAwsState, setTimeslotsFromAwsState] = useState<Timeslot[]>(timeslotsFromAws)
  const [influencersFromAwsState, setInfluencersFromAwsState] = useState<Influencer[]>(influencersFromAws)

  //for ISR
  useEffect(() => {
    const fetchTimeslotsAndInfluencers = async () => {
      const newTimeslots = await getTimeslotsFromAws()
      setTimeslotsFromAwsState(newTimeslots)

      const newInfluencers = await getInfluencersFromAws()
      setInfluencersFromAwsState(newInfluencers)
    }

    fetchTimeslotsAndInfluencers()

    // data update once every 20 seconds
    const intervalId = setInterval(fetchTimeslotsAndInfluencers, 20000)
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
      influencersFromAws: influencersFromAwsState,
      
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