export type Influencer = {
  full_name: string;
  kana_name: string;
  email: string;
  birthdate: string;
  is_attend: boolean;
  timeslot?: number;
  number_of_attendees?: number;
  first_companion_name?: string;
  second_companion_name?: string;
}