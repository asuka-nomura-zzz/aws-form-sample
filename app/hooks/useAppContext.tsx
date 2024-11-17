'use client'
import { useState, useEffect } from 'react'
import { createContext, useContext, FC, PropsWithChildren } from 'react'
import { Timeslot } from '@/app/types/Timeslot';
import { getTimeslotsFromAws } from '../utils/getTimeslotsFromAws';
import { getInfluencersFromAws } from '../utils/getInfluencers';
import { InfluencerWithId } from '../types/InfluencerWithId';

export const AppContext = createContext<{
  timeslotsFromAws: Timeslot[],
  influencersFromAws: InfluencerWithId[],

  //for ISR
  setInfluencers: (influencers: InfluencerWithId[]) => void,
  setTimeslots: (timeslots: Timeslot[]) => void,
  refreshTimeslots: () => void,
}>({
  timeslotsFromAws: [],
  influencersFromAws: [],

  //for ISR
  setInfluencers: () => {},
  setTimeslots: () => {},
  refreshTimeslots: () => { }
});

export const AppWrapper: FC<PropsWithChildren<{
  timeslotsFromAws: Timeslot[]
  influencersFromAws: InfluencerWithId[]
}>> = ({ timeslotsFromAws, influencersFromAws, children }) => {

  //for ISR
  const [timeslotsFromAwsState, setTimeslotsFromAwsState] = useState<Timeslot[]>(timeslotsFromAws)
  const [influencersFromAwsState, setInfluencersFromAwsState] = useState<InfluencerWithId[]>(influencersFromAws)

  //for ISR
  useEffect(() => {
    const fetchTimeslotsAndInfluencers = async () => {
      const newTimeslots = await getTimeslotsFromAws()
      setTimeslotsFromAwsState(newTimeslots)

      const newInfluencers = await getInfluencersFromAws()
      setInfluencersFromAwsState(newInfluencers)
    }

    fetchTimeslotsAndInfluencers()

    // data update once every 3600 seconds
    const intervalId = setInterval(fetchTimeslotsAndInfluencers, 3600000)
    return () => clearInterval(intervalId)
  }, [])

  const setInfluencers = (influencers: InfluencerWithId[]) => {
    setInfluencersFromAwsState(influencers)
  }
  const setTimeslots = (timeslots: Timeslot[]) => {
    setTimeslotsFromAwsState(timeslots)
  }

  //for ISR
  const refreshTimeslots = () => {
    setTimeslotsFromAwsState(timeslotsFromAwsState)
  }

  return (
    <AppContext.Provider value={{
      timeslotsFromAws: timeslotsFromAwsState,
      influencersFromAws: influencersFromAwsState,

      //for ISR
      setInfluencers,
      setTimeslots,
      refreshTimeslots
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}