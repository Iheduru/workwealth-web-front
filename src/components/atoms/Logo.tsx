
import React from "react";

interface LogoProps {
  variant?: "full" | "icon";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  variant = "full", 
  size = "md",
  className = ""
}) => {
  const sizeClasses = {
    sm: variant === "full" ? "h-8" : "h-6",
    md: variant === "full" ? "h-10" : "h-8",
    lg: variant === "full" ? "h-12" : "h-10"
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`text-ww-purple-500 font-bold ${sizeClasses[size]}`}>
        {variant === "full" ? (
          <div className="flex items-center">
            <span className="text-ww-purple-500 flex items-center gap-1">
              <svg viewBox="0 0 24 24" fill="none" className={sizeClasses[size]}>
                <path 
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                  fill="currentColor" 
                  fillOpacity="0.2"
                />
                <path 
                  d="M15 16C15 16.5523 14.5523 17 14 17H10C9.44772 17 9 16.5523 9 16V14C9 13.4477 9.44772 13 10 13H14C14.5523 13 15 13.4477 15 14V16Z" 
                  fill="currentColor"
                />
                <path 
                  d="M7.5 10.5L6 12L4.5 10.5M19.5 10.5L18 12L16.5 10.5" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M15 8C15 8.55228 14.5523 9 14 9H10C9.44772 9 9 8.55228 9 8V6C9 5.44772 9.44772 5 10 5H14C14.5523 5 15 5.44772 15 6V8Z" 
                  fill="currentColor"
                />
              </svg>
              <span className="font-bold">WorkWealth</span>
            </span>
          </div>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" className={sizeClasses[size]}>
            <path 
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
              fill="currentColor" 
              fillOpacity="0.2"
            />
            <path 
              d="M15 16C15 16.5523 14.5523 17 14 17H10C9.44772 17 9 16.5523 9 16V14C9 13.4477 9.44772 13 10 13H14C14.5523 13 15 13.4477 15 14V16Z" 
              fill="currentColor"
            />
            <path 
              d="M7.5 10.5L6 12L4.5 10.5M19.5 10.5L18 12L16.5 10.5" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M15 8C15 8.55228 14.5523 9 14 9H10C9.44772 9 9 8.55228 9 8V6C9 5.44772 9.44772 5 10 5H14C14.5523 5 15 5.44772 15 6V8Z" 
              fill="currentColor"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default Logo;
