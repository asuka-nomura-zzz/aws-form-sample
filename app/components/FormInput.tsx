import React from 'react';

type FormInputProps = {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, value, onChange, type = 'text' }) => {
  return (
    <div className="mb-6">
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type={type}
        value={value}
        className="w-full border"
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
