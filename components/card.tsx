import { cn } from "../utils/utils";

export default function Card(props: any) {
  return (
    <div
      {...props}
      className={cn(
        "rounded bg-white p-4 shadow sm:p-6",
        props.customClassname ? props.customClassname : ""
      )}
    />
  );
}
