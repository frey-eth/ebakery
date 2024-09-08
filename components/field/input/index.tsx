import React from "react";

type InputFieldProps = {
  register?: any;
  name: string;
  label: string;
  defaultValue?: string;
  placeholder?: string;
  description: string;
  onChange?: (e: any) => void;
  suffix?: string;
  required?: boolean;
  inputType?: string;
};

const InputField = ({
  register,
  name,
  label,
  placeholder,
  defaultValue,
  description,
  onChange,
  suffix,
  required,
  inputType = "text",
}: InputFieldProps) => {
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (/^(?!0(\.0+)?$)\d*\.?\d+$/.test(value) == false) {
      e.preventDefault();
    }
  };
  return (
    <div className="w-full flex flex-col gap-1 f font-pixel">
      <label className="text-white text-lg flex flex-row gap-1 whitespace-nowrap">
        {label}
        {required && <span className=" text-red-500 font-bold text-lg">*</span>}
      </label>
      <div className="flex flex-row w-full border border-white p-2 text-white text-lg gap-1">
        <input
          {...(register && register(name))}
          type={inputType}
          min={inputType === "number" ? "0" : undefined}
          step={inputType === "number" ? "any" : undefined}
          defaultValue={defaultValue}
          className="w-full bg-transparent border-none outline-none appearance-none"
          placeholder={placeholder}
          onInput={inputType === "number" ? handleInput : undefined}
          onChange={(e) => {
            const value = e.target.value;
            if (parseFloat(value) < 0 && inputType === "number") {
              e.target.value = "";
            }
            if (onChange) {
              onChange(value);
            }
          }}
        />
        {suffix && (
          <span className="text-white text-lg bg-white/50 border-l px-2">
            {suffix}
          </span>
        )}
      </div>

      <p className="text-white/60  text-sm tracking-widest">{description}</p>
    </div>
  );
};

export default InputField;
