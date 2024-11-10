const URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export async function deleteInfluencerOnAws(id: string) {
  try {
    const response = await fetch(`${URL}/influencers/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id })
    });

    const responseData = await response.json();

    console.log('Response Status:', response.status);
    console.log('Response Body:', responseData);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${responseData.message}`);
    }

    console.log('Influencer deleted successfully');
  } catch (error) {
    console.error('An error occurred while deleting influencer:', error);
  }
}
