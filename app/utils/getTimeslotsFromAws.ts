const URL = process.env.NEXT_PUBLIC_API_ENDPOINT

export async function getTimeslotsFromAws() {
  try {
    const response = await fetch(URL + '/timeslots')
    const data = await response.json()
    return JSON.parse(data.body)
  } catch (error) {
    console.error('Error fetching timeslots:', error)
    return null
  }
}