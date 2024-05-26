import { tailwindClassResolve } from "@/helper/util";
import { IReactFC } from "@/types";
import SpinnerIcon from "./lib/icons/SpinnerIcon";

interface IButton {
  className?: string;
  color?: string;
  href?: string;
  isDisabled?: boolean;
  handleClick?: () => void;
  isBusy?: boolean;
  variant?: "brand" | "dark" | "danger" | "warning" | "success";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const Button: IReactFC<IButton> = ({ children, href, size, handleClick, isBusy, isDisabled, variant, className }) => {
  const isDisabled01 = isDisabled === true;

  const className01 = tailwindClassResolve([
    "active:outline-none focus:outline-none font-medium rounded-lg text-sm text-center",
    "px-5 py-2.5 mr-2 mb-2",
    "text-white",

    "bg-brand-600 text-brand-50",
    //
    { "bg-danger": variant === "danger" },
    { "text-white": variant === "danger" },
    //
    { "bg-warning": variant === "warning" },
    { "text-brandark-900": variant === "warning" },
    //
    { "bg-brandark-700": variant === "dark" },
    { "text-brandark-50": variant === "dark" },
    //
    { "bg-success": variant === "success" },
    { "text-white": variant === "success" },
    //
    { "cursor-not-allowed": isDisabled01 },

    { "opacity-50": isDisabled01 },

    "hover:opacity-90",
    { "hover:opacity-50": isDisabled01 },

    { "px-3 py-2 text-xs font-medium": size === "xs" },
    { "px-3 py-2 text-sm font-medium": size === "sm" },
    { "px-5 py-2.5 text-sm font-medium": size === "md" },
    { "px-5 py-3 text-base font-medium": size === "lg" },
    { "px-6 py-3.5 text-base font-medium": size === "xl" },
    className,
  ]);

  if (href) {
    return (
      <a href={href} className={className01} style={{ pointerEvents: isDisabled01 ? "none" : "all" }}>
        {isBusy && <SpinnerIcon boxSize={20} className="mr-2" />}
        {children}
      </a>
    );
  }

  return (
    <button type="button" disabled={isDisabled01} onClick={handleClick} className={className01}>
      {isBusy && <SpinnerIcon boxSize={20} className="mr-2" />}
      {children}
    </button>
  );
};

export default Button;
