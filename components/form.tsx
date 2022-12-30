import React from "react";
import { cn } from "../utils/utils";

function InputWrapper({
  label,
  rightHelper,
  prefix,
  suffix,
  error,
  helper,
  children,
}: any) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div>{rightHelper}</div>
      </div>
      <div className="my-2 flex rounded">
        {prefix && (
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
            {prefix}
          </span>
        )}
        {children}
        {suffix && (
          <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
            {suffix}
          </span>
        )}
      </div>
      {helper && !error && (
        <div className="whitespace-pre-line break-all text-xs text-gray-500">
          {helper}
        </div>
      )}
      {error && <div className="text-xs text-red-500">{error.message}</div>}
    </div>
  );
}

export function Input({
  register,
  name,
  prefix,
  validation,
  label,
  rightHelper,
  helper,
  suffix,
  error,
  ...rest
}: any) {
  const inputWrapperProps = {
    label,
    rightHelper,
    prefix,
    suffix,
    error,
    helper,
  };
  return (
    <InputWrapper {...inputWrapperProps}>
      <input
        {...rest}
        {...(name && { ...register(name, validation) })}
        type="text"
        className={cn(
          "block w-full min-w-0 flex-1 rounded border border-gray-300 px-3 py-2 text-sm text-gray-700",
          prefix ? "rounded-l-none" : "",
          suffix ? "rounded-r-none" : ""
        )}
      />
    </InputWrapper>
  );
}

export function TextArea({
  register,
  name,
  prefix,
  validation,
  label,
  rightHelper,
  helper,
  suffix,
  error,
  rows = 3,
  ...rest
}: any) {
  const inputWrapperProps = {
    label,
    rightHelper,
    prefix,
    suffix,
    error,
    helper,
  };
  return (
    <InputWrapper {...inputWrapperProps}>
      <textarea
        {...rest}
        {...(name && { ...register(name, validation) })}
        type="text"
        rows={rows}
        className={cn(
          "block w-full min-w-0 flex-1 rounded border border-gray-300 px-3 py-2 text-sm text-gray-700",
          prefix ? "rounded-l-none" : "",
          suffix ? "rounded-r-none" : ""
        )}
      />
    </InputWrapper>
  );
}
