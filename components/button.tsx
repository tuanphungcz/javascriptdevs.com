import { cn } from "../utils/utils";

const commonButtonProps =
  "inline-flex items-center px-4 py-2 text-sm space-x-2 font-medium shadow-sm transition rounded-lg cursor-pointer font-medium relative";

export const PrimaryButton: React.FC<any> = ({ children, ...other }) => {
  return (
    <button
      {...other}
      className={cn(
        "border border-gray-300 bg-gray-900 text-white  hover:opacity-90",
        commonButtonProps
      )}
    >
      {children}
    </button>
  );
};

export const SecondaryButton: React.FC<any> = ({ children, ...other }) => {
  return (
    <button
      {...other}
      className={cn(
        " border  border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:opacity-90",
        commonButtonProps
      )}
    >
      {children}
    </button>
  );
};
