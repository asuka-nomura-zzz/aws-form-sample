import { Influencer } from "../types/Influencer";

const URL = process.env.NEXT_PUBLIC_API_ENDPOINT

export async function postInfluencerToAws(influencer: Influencer) {
  try {
    const response = await fetch(`${URL}/influencers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(influencer),
    });

    const responseData = await response.json();

    console.log('Response Status:', response.status);
    console.log('Response Body:', responseData);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${responseData.message}`);
    }

    console.log('posting influencer succeeded');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
