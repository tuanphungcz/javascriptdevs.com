import type { TextareaHTMLAttributes } from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";

import { Textarea } from "@/components/form/ui";
import { cn } from "@/utils/helpers";
import { useController } from "react-hook-form";

import { InputWrapper } from "./InputWrapper";

export type TextareaProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "defaultValue"
  > & {
    label?: string;
    description?: string;
    placeholder?: string;
    withAsterisk?: boolean;
    leftSection?: React.ReactNode;
    className?: string;
  };

export const TextareaField = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  label,
  description,
  placeholder,
  withAsterisk,
  leftSection,
  className,
  ...props
}: TextareaProps<T>) => {
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
      <Textarea
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
