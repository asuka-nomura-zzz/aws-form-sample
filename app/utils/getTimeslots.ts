import { supabase } from "../lib/createClient"

export async function getTimeslots() {
  const { data } = await supabase
    .from('timeslots')
    .select()
    .gt('stock', 0)
    .order('id')
    
  const timeslots = (data ?? []).map(item => ({
    id: item.id as number,
    name: item.name as string,
    stock: item.stock as number,
  }))

  return timeslots
}