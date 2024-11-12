import type { InputHTMLAttributes } from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import { useState } from "react";

import { Input } from "@/components/form/ui";
import { Button } from "@/components/ui";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import { useController } from "react-hook-form";

import { InputWrapper } from "./InputWrapper";

export type PasswordInputProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue"> & {
    label?: string;
  };

export const PasswordInputField = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  label,
  ...props
}: PasswordInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    field: { value, onChange: fieldOnChange, ...field },
    fieldState,
  } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  return (
    <InputWrapper label={label} error={fieldState.error} name={name}>
      <div className="relative">
        <Input
          id={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => {
            fieldOnChange(e);
            onChange?.(e);
          }}
          aria-invalid={!!fieldState.error}
          aria-describedby={fieldState.error ? `${name}-error` : undefined}
          {...field}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <IconEyeClosed className="h-4 w-4" />
          ) : (
            <IconEye className="h-4 w-4" />
          )}
        </Button>
      </div>
    </InputWrapper>
  );
};
