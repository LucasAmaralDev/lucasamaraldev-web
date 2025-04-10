import React, { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "success";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  startIcon,
  endIcon,
}) => {
  // Determinando classes de estilo com base nas props
  const baseStyles =
    "flex items-center justify-center border font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Estilo por tamanho
  const sizeStyles = {
    sm: "py-2 px-3 text-sm",
    md: "py-3 px-4 text-base",
    lg: "py-4 px-6 text-lg",
  };

  // Estilo por variante
  const variantStyles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white border-transparent focus:ring-blue-500",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-200 focus:ring-gray-500",
    outline:
      "bg-transparent hover:bg-gray-50 text-blue-600 border-blue-600 focus:ring-blue-500",
    danger:
      "bg-red-600 hover:bg-red-700 text-white border-transparent focus:ring-red-500",
    success:
      "bg-green-600 hover:bg-green-700 text-white border-transparent focus:ring-green-500",
  };

  // Estados de loading e disabled
  const stateStyles = {
    default: "cursor-pointer",
    loading: "",
    disabled: "opacity-50 cursor-not-allowed",
  };

  // Combinando classes
  const buttonClasses = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${
      disabled
        ? stateStyles.disabled
        : loading
        ? stateStyles.loading
        : stateStyles.default
    }
    ${fullWidth ? "w-full" : ""}
    ${className}
  `;

  // Loader SVG
  const loader = (
    <svg
      className={`animate-spin ${
        size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5"
      } ${startIcon ? "-ml-1 mr-2" : "-ml-1 mr-2"}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
    >
      {loading && loader}
      {!loading && startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
      {!loading && endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};

export default Button;
