import { tailwindClassResolve } from "@/helper/util";
import { IReactFC } from "@/types";

const Card: IReactFC<{ className?: string }> = ({ children, className }) => {
  const className01 = tailwindClassResolve([
    //
    "w-full p-4 shadow rounded-2xl overflow-hidden",
    "border-gray-200",
    "bg-white",
    className,
  ]);

  return <div className={className01}>{children}</div>;
};

export default Card;
