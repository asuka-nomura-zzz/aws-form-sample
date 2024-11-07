const URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export async function decreaseStockOnAWS(id: string, decreaseBy: number) {
  try {
    const response = await fetch(`${URL}/timeslots/${id}/stock`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: Number(id), decreaseBy: Number(decreaseBy) }),
    });

    const responseData = await response.json();

    console.log('Response Status:', response.status);
    console.log('Response Body:', responseData);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${responseData.message}`);
    }

    console.log('decrease succeeded');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
