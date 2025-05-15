
import React, { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputWithIconProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  iconPosition?: "left" | "right";
  error?: string;
  className?: string;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  (
    { icon, iconPosition = "left", error, className = "", ...props },
    ref
  ) => {
    return (
      <div className="w-full">
        <div className="relative">
          <input
            ref={ref}
            className={cn(
              "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              iconPosition === "left" ? "pl-10" : "pr-10",
              error ? "border-red-500 focus-visible:ring-red-500" : "",
              className
            )}
            {...props}
          />
          <div
            className={cn(
              "absolute top-0 bottom-0 flex items-center justify-center text-muted-foreground",
              iconPosition === "left" ? "left-0 pl-3" : "right-0 pr-3"
            )}
          >
            {icon}
          </div>
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

InputWithIcon.displayName = "InputWithIcon";

export default InputWithIcon;
