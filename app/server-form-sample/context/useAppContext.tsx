'use client'

import { createContext, useContext, FC, PropsWithChildren } from 'react'

type Timeslot = {
  id: number;
  name: string;
  stock: number;
}

export const AppContext = createContext<{
  timeslots: Timeslot[]
}>({
  timeslots: []
});

export const AppWrapper: FC<PropsWithChildren<{
  timeslots: Timeslot[],
}>> = ({ timeslots, children }) => {
  return (
    <AppContext.Provider value={{timeslots}}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}