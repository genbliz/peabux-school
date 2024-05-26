import { IReactFC } from "@/types";
import { tailwindClassResolve } from "@/helper/util";

const PageSection: IReactFC<{ className?: string }> = ({ children, className }) => {
  const className01 = tailwindClassResolve(["w-full p-5", className]);
  return <section className={className01}>{children}</section>;
};

export default PageSection;
