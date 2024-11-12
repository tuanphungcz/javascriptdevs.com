"use client";

import type { FieldValues, UseControllerProps } from "react-hook-form";
import * as React from "react";
import { forwardRef, useEffect } from "react";

import { Label } from "@/components/form/ui";
import {
  Badge,
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui";
import { cn } from "@/utils/helpers";
import { IconX } from "@tabler/icons-react";
import { Command as CommandPrimitive, useCommandState } from "cmdk";
import { useController } from "react-hook-form";

export interface Option {
  value: string;
  label: string;
  disable?: boolean;
  /** fixed option that can't be removed. */
  fixed?: boolean;
  /** Group the options by providing key. */
  [key: string]: string | boolean | undefined;
}

interface GroupOption {
  [key: string]: Option[];
}

interface MultiSelectFieldProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label?: string;
  description?: string;
  defaultOptions?: Option[];
  /** manually controlled options */
  options?: Option[];
  placeholder?: string;
  /** Loading component. */
  loadingIndicator?: React.ReactNode;
  /** Empty component. */
  emptyIndicator?: React.ReactNode;
  /** Debounce time for async search. Only work with `onSearch`. */
  delay?: number;
  /**
   * Only work with `onSearch` prop. Trigger search when `onFocus`.
   * For example, when user click on the input, it will trigger the search to get initial options.
   **/
  triggerSearchOnFocus?: boolean;
  /** async search */
  onSearch?: (value: string) => Promise<Option[]>;
  /**
   * sync search. This search will not showing loadingIndicator.
   * The rest props are the same as async search.
   * i.e.: creatable, groupBy, delay.
   **/
  onSearchSync?: (value: string) => Option[];
  onValueChange?: (options: string[]) => void;
  /** Limit the maximum number of selected options. */
  maxSelected?: number;
  /** When the number of selected options exceeds the limit, the onMaxSelected will be called. */
  onMaxSelected?: (maxLimit: number) => void;
  /** Hide the placeholder when there are options selected. */
  hidePlaceholderWhenSelected?: boolean;
  disabled?: boolean;
  /** Group the options base on provided key. */
  groupBy?: string;
  className?: string;
  badgeClassName?: string;
  /**
   * First item selected is a default behavior by cmdk. That is why the default is true.
   * This is a workaround solution by add a dummy item.
   *
   * @reference: https://github.com/pacocoursey/cmdk/issues/171
   */
  selectFirstItem?: boolean;
  /** Allow user to create option when there is no option matched. */
  creatable?: boolean;
  /** Props of `Command` */
  commandProps?: React.ComponentPropsWithoutRef<typeof Command>;
  /** Props of `CommandInput` */
  inputProps?: Omit<
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
    "value" | "placeholder" | "disabled"
  >;
  /** hide the clear all button. */
  hideClearAllButton?: boolean;
  /** Show red asterisk in label */
  withAsterisk?: boolean;
}

export interface MultipleSelectorRef {
  selectedValue: Option[];
  input: HTMLInputElement;
  focus: () => void;
  reset: () => void;
}

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

function transToGroupOption(options: Option[], groupBy?: string) {
  if (options.length === 0) {
    return {};
  }
  if (!groupBy) {
    return {
      "": options,
    };
  }

  const groupOption: GroupOption = {};
  options.forEach((option) => {
    const key = (option[groupBy] as string) || "";
    if (!groupOption[key]) {
      groupOption[key] = [];
    }
    groupOption[key].push(option);
  });
  return groupOption;
}

function removePickedOption(groupOption: GroupOption, picked: string[]) {
  const cloneOption = JSON.parse(JSON.stringify(groupOption)) as GroupOption;

  for (const [key, value] of Object.entries(cloneOption)) {
    cloneOption[key] = value.filter((val) => !picked.includes(val.value));
  }
  return cloneOption;
}

function isOptionsExist(groupOption: GroupOption, targetOption: Option[]) {
  for (const [, value] of Object.entries(groupOption)) {
    if (
      value.some((option) => targetOption.find((p) => p.value === option.value))
    ) {
      return true;
    }
  }
  return false;
}

/**
 * The `CommandEmpty` of shadcn/ui will cause the cmdk empty not rendering correctly.
 * So we create one and copy the `Empty` implementation from `cmdk`.
 *
 * @reference: https://github.com/hsuanyi-chou/shadcn-ui-expansions/issues/34#issuecomment-1949561607
 **/
const CommandEmpty = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof CommandPrimitive.Empty>
>(({ className, ...props }, forwardedRef) => {
  const render = useCommandState((state) => state.filtered.count === 0);

  if (!render) return null;

  return (
    <div
      ref={forwardedRef}
      className={cn("py-6 text-center text-sm", className)}
      cmdk-empty=""
      role="presentation"
      {...props}
    />
  );
});

CommandEmpty.displayName = "CommandEmpty";

export const MultiSelectField = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onValueChange,
  label,
  description,
  placeholder,
  defaultOptions: arrayDefaultOptions = [],
  options: arrayOptions,
  delay,
  onSearch,
  onSearchSync,
  loadingIndicator,
  emptyIndicator,
  maxSelected = Number.MAX_SAFE_INTEGER,
  onMaxSelected,
  hidePlaceholderWhenSelected,
  disabled,
  groupBy,
  className,
  badgeClassName,
  selectFirstItem = true,
  creatable = false,
  triggerSearchOnFocus = false,
  commandProps,
  inputProps,
  hideClearAllButton = false,
  withAsterisk = false,
}: MultiSelectFieldProps<T>) => {
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

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [onScrollbar, setOnScrollbar] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const [selected, setSelected] = React.useState<string[]>(value || []);
  const [options, setOptions] = React.useState<GroupOption>(
    transToGroupOption(arrayDefaultOptions, groupBy),
  );
  const [inputValue, setInputValue] = React.useState("");
  const debouncedSearchTerm = useDebounce(inputValue, delay || 500);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
      inputRef.current.blur();
    }
  };

  const handleUnselect = React.useCallback(
    (optionValue: string) => {
      const newOptions = selected.filter((s) => s !== optionValue);
      setSelected(newOptions);
      fieldOnChange(newOptions);
      onValueChange?.(newOptions);
    },
    [fieldOnChange, onValueChange, selected],
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "" && selected.length > 0) {
            const lastSelectOption = selected[selected.length - 1];
            const option = Object.values(options)
              .flat()
              .find((opt) => opt.value === lastSelectOption);
            if (option && !option.fixed) {
              handleUnselect(lastSelectOption);
            }
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [handleUnselect, options, selected],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchend", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

  useEffect(() => {
    if (!arrayOptions || onSearch) {
      return;
    }
    const newOption = transToGroupOption(arrayOptions || [], groupBy);
    if (JSON.stringify(newOption) !== JSON.stringify(options)) {
      setOptions(newOption);
    }
  }, [arrayDefaultOptions, arrayOptions, groupBy, onSearch, options]);

  useEffect(() => {
    const doSearchSync = () => {
      const res = onSearchSync?.(debouncedSearchTerm);
      setOptions(transToGroupOption(res || [], groupBy));
    };

    const exec = async () => {
      if (!onSearchSync || !open) return;

      if (triggerSearchOnFocus) {
        doSearchSync();
      }

      if (debouncedSearchTerm) {
        doSearchSync();
      }
    };

    void exec();
  }, [debouncedSearchTerm, groupBy, onSearchSync, open, triggerSearchOnFocus]);

  useEffect(() => {
    const doSearch = async () => {
      setIsLoading(true);
      const res = await onSearch?.(debouncedSearchTerm);
      setOptions(transToGroupOption(res || [], groupBy));
      setIsLoading(false);
    };

    const exec = async () => {
      if (!onSearch || !open) return;

      if (triggerSearchOnFocus) {
        await doSearch();
      }

      if (debouncedSearchTerm) {
        await doSearch();
      }
    };

    void exec();
  }, [debouncedSearchTerm, groupBy, onSearch, open, triggerSearchOnFocus]);

  const CreatableItem = () => {
    if (!creatable) return undefined;
    if (
      isOptionsExist(options, [{ value: inputValue, label: inputValue }]) ||
      selected.includes(inputValue)
    ) {
      return undefined;
    }

    const Item = (
      <CommandItem
        value={inputValue}
        className="cursor-pointer"
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onSelect={(value: string) => {
          if (selected.length >= maxSelected) {
            onMaxSelected?.(selected.length);
            return;
          }
          setInputValue("");
          const newOptions = [...selected, value];
          setSelected(newOptions);
          fieldOnChange(newOptions);
          onValueChange?.(newOptions);
        }}
      >
        {`Create "${inputValue}"`}
      </CommandItem>
    );

    if (!onSearch && inputValue.length > 0) {
      return Item;
    }

    if (onSearch && debouncedSearchTerm.length > 0 && !isLoading) {
      return Item;
    }

    return undefined;
  };

  const EmptyItem = React.useCallback(() => {
    if (!emptyIndicator) return undefined;

    if (onSearch && !creatable && Object.keys(options).length === 0) {
      return (
        <CommandItem value="-" disabled>
          {emptyIndicator}
        </CommandItem>
      );
    }

    return <CommandEmpty>{emptyIndicator}</CommandEmpty>;
  }, [creatable, emptyIndicator, onSearch, options]);

  const selectables = React.useMemo<GroupOption>(
    () => removePickedOption(options, selected),
    [options, selected],
  );

  const commandFilter = React.useCallback(() => {
    if (commandProps?.filter) {
      return commandProps.filter;
    }

    if (creatable) {
      return (value: string, search: string) => {
        return value.toLowerCase().includes(search.toLowerCase()) ? 1 : -1;
      };
    }
    return undefined;
  }, [creatable, commandProps?.filter]);

  const getSelectedOptionLabel = (value: string) => {
    const option = Object.values(options)
      .flat()
      .find((opt) => opt.value === value);
    return option?.label || value;
  };

  return (
    <div className={cn("w-full space-y-2", className)}>
      {label && (
        <div>
          <Label htmlFor={name}>
            {label}
            {withAsterisk && <span className="text-destructive"> *</span>}
          </Label>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <Command
        ref={dropdownRef}
        {...commandProps}
        onKeyDown={(e) => {
          handleKeyDown(e);
          commandProps?.onKeyDown?.(e);
        }}
        className={cn(
          "h-auto overflow-visible bg-transparent",
          commandProps?.className,
        )}
        shouldFilter={
          commandProps?.shouldFilter !== undefined
            ? commandProps.shouldFilter
            : !onSearch
        }
        filter={commandFilter()}
      >
        <div
          className={cn(
            "min-h-10 rounded-md border border-input bg-background text-sm ring-offset-background focus-within:border-gray-400",
            {
              "px-3 py-2": selected.length !== 0,
              "cursor-text": !disabled && selected.length !== 0,
            },
            fieldState.error &&
              "border-destructive focus-within:border-destructive",
          )}
          onClick={() => {
            if (disabled) return;
            inputRef?.current?.focus();
          }}
        >
          <div className="relative flex flex-wrap gap-1">
            {selected.map((value) => {
              const option = Object.values(options)
                .flat()
                .find((opt) => opt.value === value);
              return (
                <Badge
                  key={value}
                  variant="secondary"
                  className={cn(
                    "data-[disabled]:bg-muted-foreground/50 data-[disabled]:text-muted data-[disabled]:hover:bg-muted-foreground/50",
                    "data-[fixed]:bg-muted-foreground/50 data-[fixed]:text-muted data-[fixed]:hover:bg-muted-foreground/50",
                    badgeClassName,
                  )}
                  data-fixed={option?.fixed}
                  data-disabled={disabled || undefined}
                >
                  {getSelectedOptionLabel(value)}
                  <button
                    className={cn(
                      "ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2",
                      (disabled || option?.fixed) && "hidden",
                    )}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(value);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(value)}
                  >
                    <IconX className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              );
            })}
            <CommandPrimitive.Input
              {...inputProps}
              {...field}
              ref={inputRef}
              value={inputValue}
              disabled={disabled}
              onValueChange={(value) => {
                setInputValue(value);
                inputProps?.onValueChange?.(value);
              }}
              onBlur={(event) => {
                if (!onScrollbar) {
                  setOpen(false);
                }
                inputProps?.onBlur?.(event);
                field.onBlur();
              }}
              onFocus={(event) => {
                setOpen(true);
                triggerSearchOnFocus && onSearch?.(debouncedSearchTerm);
                inputProps?.onFocus?.(event);
              }}
              placeholder={
                hidePlaceholderWhenSelected && selected.length !== 0
                  ? ""
                  : placeholder
              }
              className={cn(
                "flex-1 bg-transparent outline-none placeholder:text-muted-foreground",
                {
                  "w-full": hidePlaceholderWhenSelected,
                  "px-3 py-2": selected.length === 0,
                  "ml-1": selected.length !== 0,
                },
                inputProps?.className,
              )}
              aria-invalid={!!fieldState.error}
              aria-describedby={fieldState.error ? `${name}-error` : undefined}
            />
            <button
              type="button"
              onClick={() => {
                const fixedValues = selected.filter((value) => {
                  const option = Object.values(options)
                    .flat()
                    .find((opt) => opt.value === value);
                  return option?.fixed;
                });
                setSelected(fixedValues);
                fieldOnChange(fixedValues);
                onValueChange?.(fixedValues);
              }}
              className={cn(
                "absolute right-0 h-6 w-6 p-0 text-muted-foreground/60 hover:text-muted-foreground",
                (hideClearAllButton ||
                  disabled ||
                  selected.length < 1 ||
                  selected.filter((value) => {
                    const option = Object.values(options)
                      .flat()
                      .find((opt) => opt.value === value);
                    return option?.fixed;
                  }).length === selected.length) &&
                  "hidden",
              )}
            >
              <IconX className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="relative">
          {open && (
            <CommandList
              className="absolute top-1 z-10 max-h-[300px] w-full overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in"
              onMouseLeave={() => {
                setOnScrollbar(false);
              }}
              onMouseEnter={() => {
                setOnScrollbar(true);
              }}
              onMouseUp={() => {
                inputRef?.current?.focus();
              }}
            >
              {isLoading ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  {loadingIndicator}
                </div>
              ) : (
                <>
                  {EmptyItem()}
                  {CreatableItem()}
                  {!selectFirstItem && (
                    <CommandItem value="-" className="hidden" />
                  )}
                  {Object.entries(selectables).map(([key, dropdowns]) => (
                    <CommandGroup
                      key={key}
                      heading={key}
                      className="h-full overflow-auto"
                    >
                      <>
                        {dropdowns.map((option) => {
                          return (
                            <CommandItem
                              key={option.value}
                              value={option.value}
                              disabled={option.disable}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              onSelect={() => {
                                if (selected.length >= maxSelected) {
                                  onMaxSelected?.(selected.length);
                                  return;
                                }
                                setInputValue("");
                                const newOptions = [...selected, option.value];
                                setSelected(newOptions);
                                fieldOnChange(newOptions);
                                onValueChange?.(newOptions);
                              }}
                              className={cn(
                                "cursor-pointer",
                                option.disable &&
                                  "cursor-default text-muted-foreground",
                              )}
                            >
                              {option.label}
                            </CommandItem>
                          );
                        })}
                      </>
                    </CommandGroup>
                  ))}
                </>
              )}
            </CommandList>
          )}
        </div>
      </Command>
      {fieldState.error?.message && (
        <p className="text-xs text-destructive" id={`${name}-error`}>
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
};

MultiSelectField.displayName = "MultiSelectField";
