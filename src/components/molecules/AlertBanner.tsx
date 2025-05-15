
import React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, Info, X, Check } from "lucide-react";

interface AlertBannerProps {
  type: "success" | "info" | "warning" | "error";
  message: string;
  onClose?: () => void;
  className?: string;
}

const AlertBanner: React.FC<AlertBannerProps> = ({
  type,
  message,
  onClose,
  className = "",
}) => {
  const typeClasses = {
    success: "bg-ww-green-50 text-ww-green-800 border-ww-green-200",
    info: "bg-blue-50 text-blue-800 border-blue-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
    error: "bg-red-50 text-red-800 border-red-200",
  };

  const iconMap = {
    success: <Check size={18} className="text-ww-green-500 flex-shrink-0" />,
    info: <Info size={18} className="text-blue-500 flex-shrink-0" />,
    warning: <AlertTriangle size={18} className="text-yellow-500 flex-shrink-0" />,
    error: <AlertTriangle size={18} className="text-red-500 flex-shrink-0" />,
  };

  return (
    <div
      className={cn(
        "flex items-center p-3 rounded-md border",
        typeClasses[type],
        className
      )}
    >
      <div className="mr-2">{iconMap[type]}</div>
      <div className="flex-grow text-sm">{message}</div>
      {onClose && (
        <button
          type="button"
          className="ml-2 focus:outline-none"
          onClick={onClose}
          aria-label="Close alert"
        >
          <X size={16} className="opacity-70 hover:opacity-100" />
        </button>
      )}
    </div>
  );
};

export default AlertBanner;
