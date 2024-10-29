import React from 'react';

interface FormInputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, value, onChange, type = 'text' }) => {
  return (
    <div className="mb-6">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        className="w-full border"
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
