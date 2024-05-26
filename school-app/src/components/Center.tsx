import { tailwindClassResolve } from "@/helper/util";
import { IReactFC } from "@/types";

const Center: IReactFC<{ className?: string }> = ({ children, className }) => {
  const className01 = tailwindClassResolve(["flex flex-col justify-center items-center", className]);
  return <div className={className01}>{children}</div>;
};

export default Center;
