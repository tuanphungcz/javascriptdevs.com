import * as React from "react";

import { Label, RadioGroup, RadioGroupItem } from "@/components/form/ui";
import { cn } from "@/utils/helpers";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

import { InputWrapper } from "./InputWrapper";

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupFieldProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label?: string;
  description?: string;
  options: RadioOption[];
  className?: string;
  required?: boolean;
  columns?: number;
}

export function RadioGroupField<T extends FieldValues>({
  name,
  control,
  label,
  description,
  options,
  className,
  required,
  columns = 2,
  ...props
}: RadioGroupFieldProps<T>) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    ...props,
  });

  return (
    <InputWrapper
      label={label}
      description={description}
      error={error}
      name={name}
    >
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className={cn(
          "grid gap-4",
          columns === 2 && "grid-cols-2",
          columns === 3 && "grid-cols-3",
          columns === 4 && "grid-cols-4",
        )}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value}
              id={`${name}-${option.value}`}
              className="border-gray-300 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              aria-describedby={
                error
                  ? `${name}-error`
                  : description
                    ? `${name}-description`
                    : undefined
              }
            />
            <Label
              htmlFor={`${name}-${option.value}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>

      {error?.message && (
        <p id={`${name}-error`} className="text-xs text-destructive">
          {error.message}
        </p>
      )}
    </InputWrapper>
  );
}
