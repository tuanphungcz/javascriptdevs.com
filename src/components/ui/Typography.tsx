import { ReactNode } from "react";

import { cn } from "@/utils/helpers";

export const Title = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h1
      className={cn(
        "text-3xl font-bold text-zinc-800 md:leading-14 text-balance",
        className,
      )}
    >
      {children}
    </h1>
  );
};

export const Description = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn("text-lg leading-7 text-zinc-600 text-balance", className)}
    >
      {children}
    </div>
  );
};
