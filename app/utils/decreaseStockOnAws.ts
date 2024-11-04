const URL = process.env.NEXT_PUBLIC_API_ENDPOINT

export async function decreaseStockOnAWS(id: string) {
  fetch(URL + `/timeslots/${id}/stock`)
}