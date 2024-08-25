import React from "react";

interface InputProps {
  placeholder?: string;
  value?: string;
  type?: string;
  error?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  type,
  disabled,
  onChange,
  error,
}) => {
  return (
    <div className="w-full relative">
      { error && 
      <p className="text-red-600 text-xs left-4 top-1 absolute bg-">{error}</p>
    }
      <input
      disabled={disabled}
      onChange={onChange}
      value={value}
      type={type}
      placeholder={placeholder}
      className={`
      ${error ? "border-red-600" : "border-neutral-800"}
        w-full
        p-4
        text-lg
        bg-black
        border-2
        rounded-md
        outline-none
        text-white
        focus:border-sky-500
        focus:border-2
        transition
        disabled:bg-neutral-200
        disabled:opacity-70
        disabled:cursor-not-allowed
      `}
    />

    
    </div>
  );
};
export default Input;
