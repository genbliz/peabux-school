import { tailwindClassResolve } from "@/helper/util";
import { IReactFC } from "@/types";

const StackHorizontal: IReactFC<{ className?: string }> = ({ children, className }) => {
  const className01 = tailwindClassResolve(["flex flex-row", className]);
  return <div className={className01}>{children}</div>;
};

export default StackHorizontal;
