import { tailwindClassResolve } from "@/helper/util";
import { IReactFC } from "@/types";

const CardBody: IReactFC<{ className?: string }> = ({ children, className }) => {
  const className01 = tailwindClassResolve([
    //
    "mb-3 font-normal",
    "text-gray-700",
    // "dark:text-gray-400",
    className,
  ]);
  return <div className={className01}>{children}</div>;
};

export default CardBody;
