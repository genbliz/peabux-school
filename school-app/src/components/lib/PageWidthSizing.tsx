import { tailwindClassResolve } from "@/helper/util";
import { IReactFC } from "@/types";

type IProp = {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
};

const PageWidthSizing: IReactFC<IProp> = ({ children, maxWidth = "xl", className }) => {
  const className01 = tailwindClassResolve([
    className,
    "w-screen",
    { "max-w-screen-sm": maxWidth === "sm" },
    { "max-w-screen-md": maxWidth === "md" },
    { "max-w-screen-lg": maxWidth === "lg" },
    { "max-w-screen-xl": maxWidth === "xl" },
    { "w-full": maxWidth === "full" },
  ]);

  return (
    <div className="flex justify-center">
      <div className={className01}>{children}</div>
    </div>
  );
};

export default PageWidthSizing;
