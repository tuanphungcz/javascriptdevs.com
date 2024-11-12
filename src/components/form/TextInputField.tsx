import type { ReactNode } from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";

import { Input, Label } from "@/components/form/ui";
import { cn } from "@/utils/helpers";
import { useController } from "react-hook-form";

import { InputWrapper } from "./InputWrapper";

export type TextInputProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue"
  > & {
    label?: string;
    placeholder?: string;
    description?: string;
    withAsterisk?: boolean;
    leftSection?: ReactNode;
    className?: string;
  };

export const TextInputField = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  label,
  placeholder,
  description,
  withAsterisk,
  leftSection,
  className,
  ...props
}: TextInputProps<T>) => {
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
    <InputWrapper
      label={label}
      withAsterisk={withAsterisk}
      description={description}
      leftSection={leftSection}
      error={fieldState.error}
      name={name}
    >
      <Input
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          fieldOnChange(e);
          onChange?.(e);
        }}
        className={cn(
          leftSection && "pl-10",
          "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-gray-400",
          fieldState.error && "border-destructive focus:border-destructive",
          className,
        )}
        aria-invalid={!!fieldState.error}
        aria-errormessage={fieldState.error?.message}
        {...field}
        {...props}
      />
    </InputWrapper>
  );
};
