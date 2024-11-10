const URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export async function updateTimeslotOnAws(id: string, newName: string, newStock: number) {
  try {
    const response = await fetch(`${URL}/timeslots/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: Number(id), newName: newName, newStock: newStock }),
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
