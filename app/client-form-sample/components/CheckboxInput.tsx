import React from 'react';

interface CheckboxInputProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ label, checked, onChange }) => {
  return (
    <div className="mb-6">
      <label>{label}</label>
      <input type="checkbox" checked={checked} onChange={onChange} />
    </div>
  );
};

export default CheckboxInput;
