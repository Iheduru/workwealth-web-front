
import React from "react";
import { cn } from "@/lib/utils";

interface FormLabelProps {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

const FormLabel: React.FC<FormLabelProps> = ({
  htmlFor,
  children,
  required = false,
  className = "",
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "block text-sm font-medium text-foreground mb-1",
        className
      )}
    >
      {children}
      {required && <span className="text-ww-purple-500 ml-1">*</span>}
    </label>
  );
};

export default FormLabel;
