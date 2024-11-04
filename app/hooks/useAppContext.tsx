'use client'

import { createContext, useContext, FC, PropsWithChildren } from 'react'
import { Timeslot } from '@/app/types/Timeslot';

export const AppContext = createContext<{
  timeslots: Timeslot[],
  timeslotsFromAws: Timeslot[]
}>({
  timeslots: [],
  timeslotsFromAws: []
});

export const AppWrapper: FC<PropsWithChildren<{
  timeslots: Timeslot[],
  timeslotsFromAws: Timeslot[]
}>> = ({ timeslots, timeslotsFromAws, children }) => {
  return (
    <AppContext.Provider value={{timeslots, timeslotsFromAws}}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}