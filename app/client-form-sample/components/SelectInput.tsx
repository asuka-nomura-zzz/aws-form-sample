import React from 'react';

interface SelectInputProps {
  label: string;
  options: { value: string; label: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ label, options, onChange }) => {
  return (
    <div className="mb-6">
      <label>{label}</label>
      <select className="w-full border" onChange={onChange}>
        <option value="0">-</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
