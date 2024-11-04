import React from 'react';

type CheckboxInputProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ label, checked, onChange }) => {
  return (
    <div className="mb-6">
      <label htmlFor={label}>{label}</label>
      <input id={label} type="checkbox" checked={checked} onChange={onChange} />
    </div>
  );
};

export default CheckboxInput;
