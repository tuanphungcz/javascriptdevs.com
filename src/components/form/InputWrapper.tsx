import type { ReactNode } from "react";
import type { FieldError } from "react-hook-form";

import { Label } from "@/components/form/ui";

export const InputWrapper = ({
  children,
  label,
  withAsterisk,
  description,
  leftSection,
  error,
  name,
}: {
  children: React.ReactNode;
  label?: string;
  withAsterisk?: boolean;
  description?: string;
  leftSection?: ReactNode;
  error?: FieldError;
  name: string;
}) => {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <div>
          <Label htmlFor={name}>
            {label}
            {withAsterisk && <span className="text-red-500 ml-1">*</span>}
          </Label>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <div className="relative">
        {leftSection && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {leftSection}
          </div>
        )}
      </div>
      {children}
      {error?.message && (
        <div className="text-xs text-destructive" id={`${name}-error`}>
          {error.message}
        </div>
      )}
    </div>
  );
};
