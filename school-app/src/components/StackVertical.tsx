import { tailwindClassResolve } from "@/helper/util";
import { IReactFC } from "@/types";

const StackVertical: IReactFC<{ className?: string }> = ({ children, className }) => {
  const className01 = tailwindClassResolve([className, "flex flex-col"]);
  return <div className={className01}>{children}</div>;
};

export default StackVertical;
