const URL = process.env.NEXT_PUBLIC_API_ENDPOINT

export async function postInfluencerToAws() {
  fetch(URL + '/influencers')
}