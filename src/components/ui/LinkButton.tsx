import { ReactNode } from "react";
import Link from "next/link";

import { Button, ButtonProps, buttonVariants } from "./Button";
import { cn } from "@/utils/helpers";
import { VariantProps } from "class-variance-authority";

interface LinkButtonProps 
  extends Omit<ButtonProps, 'asChild'>, 
    VariantProps<typeof buttonVariants> {
  isExternalLink?: boolean;
  href: string;
  className?: string;
  children: ReactNode;
}

export const LinkButton = ({
  isExternalLink,
  href,
  children,
  className = "",
  ...props
}: LinkButtonProps) => {
  const externalLinkProps = isExternalLink
    ? { rel: "noopener noreferrer", target: "_blank" }
    : {};

  return (
    <Link href={href} {...externalLinkProps} className={cn('inline-block', className)}>
      <Button {...props}>{children}</Button>
    </Link>
  );
};
