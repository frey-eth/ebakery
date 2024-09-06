import React from "react";

type InputFieldProps = {
  label: string;
  placeholder: string;
  description: string;
  onChange?: (e: any) => void;
  suffix?: string;
  required?: boolean;
  inputType?: string;
};

const InputField = ({
  label,
  placeholder,
  description,
  onChange,
  suffix,
  required,
  inputType = "text",
}: InputFieldProps) => {
  return (
    <div className="w-full flex flex-col gap-1 f font-pixel">
      <label className="text-white text-lg flex flex-row gap-1">
        {label}
        {required && <span className=" text-red-500 font-bold text-lg">*</span>}
      </label>
      <input
        type={inputType}
        className="w-full bg-transparent border border-white p-2 text-white text-lg"
        placeholder={placeholder}
        onChange={(value) => {
          if (onChange) {
            onChange(value);
          }
        }}
      />

      <p className="text-white/60  text-sm tracking-widest">{description}</p>
    </div>
  );
};

export default InputField;
