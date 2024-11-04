const URL = process.env.NEXT_PUBLIC_API_ENDPOINT

export async function getTimeslotFromAwsById(id: string) {
  fetch(URL + `/timeslots/${id}`)
}