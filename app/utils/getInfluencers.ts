const URL = process.env.NEXT_PUBLIC_API_ENDPOINT

function toSnakeCase(data: Record<string, any>) {
  return Object.keys(data).reduce((acc, key) => {
    const snakeCaseKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    acc[snakeCaseKey] = data[key];
    return acc;
  }, {} as Record<string, any>);
}
export async function getInfluencersFromAws() {
  try {
    const response = await fetch(URL + '/influencers')
    const data = await response.json()
    const influencers = JSON.parse(data.body)
    return influencers.map((influencer: Record<string, any>) => toSnakeCase(influencer));
  } catch (error) {
    console.error('Error fetching influencers:', error)
    return null
  }
}
