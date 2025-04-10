import React, { ReactNode } from "react";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertProps {
  type: AlertType;
  message: string;
  icon?: ReactNode;
  onClose?: () => void;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  type,
  message,
  icon,
  onClose,
  className = "",
}) => {
  // Cores e ícones padrão para cada tipo de alerta
  const styles = {
    success: {
      bg: "bg-green-100",
      border: "border-green-200",
      text: "text-green-700",
      defaultIcon: "✅",
    },
    error: {
      bg: "bg-red-100",
      border: "border-red-200",
      text: "text-red-700",
      defaultIcon: "⚠️",
    },
    warning: {
      bg: "bg-yellow-100",
      border: "border-yellow-200",
      text: "text-yellow-700",
      defaultIcon: "⚠️",
    },
    info: {
      bg: "bg-blue-100",
      border: "border-blue-200",
      text: "text-blue-700",
      defaultIcon: "ℹ️",
    },
  };

  const { bg, border, text, defaultIcon } = styles[type];

  return (
    <div
      className={`p-4 ${bg} ${text} rounded-lg border ${border} flex items-start ${className}`}
    >
      <span className="mr-2">{icon || defaultIcon}</span>
      <span className="flex-grow">{message}</span>
      {onClose && (
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 hover:bg-opacity-20 hover:bg-gray-500 focus:outline-none"
          onClick={onClose}
          aria-label="Fechar"
        >
          <span className="sr-only">Fechar</span>
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Alert;
