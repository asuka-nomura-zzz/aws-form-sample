const URL = process.env.NEXT_PUBLIC_API_ENDPOINT

export async function decreaseStockOnAWS(id: string, decreaseBy: number) {
  try {
    const response = await fetch(`${URL}/timeslots/${id}/stock`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ decreaseBy: decreaseBy }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log('decrease succeeded')
  } catch (error) {
    console.error('An error occurred:', error);
  }
}