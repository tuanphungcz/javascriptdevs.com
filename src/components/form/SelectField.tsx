import type { FieldValues, UseControllerProps } from "react-hook-form";

import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/form/ui";
import { cn } from "@/utils/helpers";
import { useController } from "react-hook-form";

import { InputWrapper } from "./InputWrapper";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label?: string;
  description?: string;
  options: SelectOption[];
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}

export const SelectField = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onValueChange,
  label,
  description,
  options,
  className,
  placeholder,
  disabled,
  ...props
}: SelectFieldProps<T>) => {
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
      description={description}
      error={fieldState.error}
      name={name}
    >
      <Select
        value={value}
        onValueChange={(value) => {
          fieldOnChange(value);
          onValueChange?.(value);
        }}
        disabled={disabled}
        {...field}
        {...props}
      >
        <SelectTrigger
          id={name}
          className={cn(
            "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-gray-400",
            fieldState.error && "border-destructive focus:border-destructive",
          )}
          aria-invalid={!!fieldState.error}
          aria-describedby={fieldState.error ? `${name}-error` : undefined}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {fieldState.error?.message && (
        <p className="text-xs text-destructive" id={`${name}-error`}>
          {fieldState.error.message}
        </p>
      )}
    </InputWrapper>
  );
};
