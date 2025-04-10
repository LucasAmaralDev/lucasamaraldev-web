import React, { useState, ReactNode } from "react";
import Input from "./Input";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

interface PasswordInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  label?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
  autoComplete?: string;
  icon?: ReactNode;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  icon = <FaLock className="text-gray-400" />,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Input
      {...props}
      type={showPassword ? "text" : "password"}
      icon={icon}
      rightIcon={
        showPassword ? (
          <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
        ) : (
          <FaEye className="text-gray-400 hover:text-gray-600" />
        )
      }
      onRightIconClick={togglePasswordVisibility}
    />
  );
};

export default PasswordInput;
