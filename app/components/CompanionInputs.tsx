import React from 'react';
import FormInput from './FormInput';

type CompanionInputsProps = {
  numberOfAttendees: number;
  firstCompanionName: string;
  setFirstCompanionName: (name: string) => void;
  secondCompanionName: string;
  setSecondCompanionName: (name: string) => void;
}

const CompanionInputs: React.FC<CompanionInputsProps> = ({ numberOfAttendees, firstCompanionName, setFirstCompanionName, secondCompanionName, setSecondCompanionName }) => {
  return (
    <>
      {numberOfAttendees >= 2 && (
        <FormInput 
          label="一人目の同行者様"
          value={firstCompanionName}
          onChange={(event) => setFirstCompanionName(event.target.value)}
        />
      )}
      {numberOfAttendees === 3 && (
        <FormInput 
          label="二人目の同行者様"
          value={secondCompanionName}
          onChange={(event) => setSecondCompanionName(event.target.value)}
        />
      )}
    </>
  );
};

export default CompanionInputs;
