import React from 'react'
import { supabase } from '../lib/createClient'
import { AppWrapper } from './context/useAppContext'

const Layout = async ({children}: any) => {

  const { data } = await supabase
    .from('timeslots')
    .select()
    .gt('stock', 0)
    .order('id')
    
  const timeslots = (data ?? []).map(item => ({
    id: item.id as number,
    name: item.name as string,
    stock: item.stock as number,
  }));

  return (
    <AppWrapper timeslots={timeslots}>
      {children}
    </AppWrapper>
  )
}

export default Layout