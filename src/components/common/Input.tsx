import React, { ReactNode } from "react";

interface InputProps {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  label?: string;
  error?: string;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  onRightIconClick?: () => void;
  className?: string;
  disabled?: boolean;
  autoComplete?: string;
  maxLength?: number;
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  type,
  value,
  onChange,
  required = false,
  placeholder,
  label,
  error,
  icon,
  rightIcon,
  onRightIconClick,
  className = "",
  disabled = false,
  autoComplete,
  maxLength,
}) => {
  const hasLeftIcon = !!icon;
  const hasRightIcon = !!rightIcon;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {hasLeftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          maxLength={maxLength}
          className={`w-full text-black ${hasLeftIcon ? "pl-10" : "pl-3"} ${
            hasRightIcon ? "pr-10" : "pr-3"
          } py-3 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
          }`}
        />
        {hasRightIcon && (
          <div
            className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
              onRightIconClick ? "cursor-pointer" : "pointer-events-none"
            }`}
            onClick={onRightIconClick}
          >
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
