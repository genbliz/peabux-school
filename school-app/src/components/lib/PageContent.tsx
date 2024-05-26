import { tailwindClassResolve } from "@/helper/util";
import { IReactFC } from "@/types";

const PageContent: IReactFC<{ className?: string; hasHeader?: boolean }> = ({ children, className, hasHeader }) => {
  const className01 = tailwindClassResolve([
    "w-full",
    {
      "pt-[70px]": hasHeader,
      "pt-[10px]": !hasHeader,
    },
    className,
  ]);

  return (
    <main className="w-full flex flex-col min-h-[calc(100vh-70px)] items-center">
      <div className={className01}>{children}</div>
    </main>
  );
};

export default PageContent;
