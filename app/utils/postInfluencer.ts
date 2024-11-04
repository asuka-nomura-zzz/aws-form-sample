import { supabase } from "../lib/createClient"
import { Influencer } from "../types/Influencer"

export async function postInfluencer(personInfo: Influencer) {
  try {
    const { error } = await supabase
      .from('influencers')
      .insert(personInfo)
    if (error) {
      console.error("error:", error)
    } else {
      console.log("influencer posted successfully")
    }
  } catch (error) {
    console.error("unexpected error happened:", error)
  }
}