import { tailwindClassResolve } from "@/helper/util";
import { IReactFC } from "@/types";

const CardTitle: IReactFC<{ className?: string }> = ({ children, className }) => {
  const className01 = tailwindClassResolve([
    //
    "mb-2 font-bold tracking-wide",
    "text-brandark-900",
    // "dark:text-white",
    className,
  ]);
  return <h4 className={className01}>{children}</h4>;
};

export default CardTitle;
