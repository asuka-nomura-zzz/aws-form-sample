const URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export async function updateInfluencerOnAws(
  id: string,
  full_name?: string,
  kana_name?: string,
  email?: string,
  birthdate?: string,
  is_attend?: boolean,
  timeslot?: number,
  number_of_attendees?: number,
  first_companion_name?: string,
  second_companion_name?: string
) {

  try {
    const response = await fetch(`${URL}/influencers/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        { id: id, 
          full_name: full_name,
          kana_name: kana_name,
          email: email,
          birthdate: birthdate,
          is_attend: is_attend,
          timeslot: timeslot,
          number_of_attendees: number_of_attendees,
          first_companion_name: first_companion_name,
          second_companion_name: second_companion_name
        }),
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
