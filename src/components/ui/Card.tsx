import clsx from "clsx";

export const Card = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={clsx("border rounded-lg p-4 bg-white", className)}>
      {children}
    </div>
  );
};
