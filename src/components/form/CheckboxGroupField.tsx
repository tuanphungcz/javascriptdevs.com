import * as React from "react";

import { Checkbox, Label } from "@/components/form/ui";
import { cn } from "@/utils/helpers";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

import { InputWrapper } from "./InputWrapper";

interface CheckboxOption {
  label: string;
  value: string;
}

interface CheckboxGroupFieldProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label?: string;
  description?: string;
  options: CheckboxOption[];
  className?: string;
  required?: boolean;
  columns?: number;
}

export function CheckboxGroupField<T extends FieldValues>({
  name,
  control,
  label,
  description,
  options,
  className,
  required,
  columns = 2,
  ...props
}: CheckboxGroupFieldProps<T>) {
  const {
    field: { value = [], onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    ...props,
  });

  const toggleOption = React.useCallback(
    (checked: boolean, optionValue: string) => {
      const newValue = checked
        ? [...(value as string[]), optionValue]
        : (value as string[]).filter((val) => val !== optionValue);
      onChange(newValue);
    },
    [value, onChange],
  );

  return (
    <InputWrapper
      label={label}
      description={description}
      error={error}
      name={name}
    >
      <div
        className={cn(
          "grid gap-4",
          columns === 2 && "grid-cols-2",
          columns === 3 && "grid-cols-3",
          columns === 4 && "grid-cols-4",
        )}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={`${name}-${option.value}`}
              checked={(value as string[]).includes(option.value)}
              onCheckedChange={(checked) =>
                toggleOption(checked as boolean, option.value)
              }
              className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-600 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
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
      </div>
    </InputWrapper>
  );
}
