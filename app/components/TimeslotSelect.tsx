import React from 'react';
import SelectInput from './SelectInput';
import { Timeslot } from '../types/Timeslot';

type TimeslotSelectProps = {
  timeslots: Timeslot[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TimeslotSelect: React.FC<TimeslotSelectProps> = ({ timeslots, onChange }) => {
  const options = timeslots.map(timeslot => ({
    value: timeslot.id.toString(),
    label: timeslot.name,
  }));

  return (
    <SelectInput 
      label="時間帯"
      options={options}
      onChange={onChange}
    />
  );
};

export default TimeslotSelect;
