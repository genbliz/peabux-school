import { tailwindClassResolve } from "@/helper/util";
import { IReactFC } from "@/types";

const Header: IReactFC<{ className?: string }> = ({ children, className }) => {
  const className01 = tailwindClassResolve([className, "w-full z-[600]", { fixed: true }, { "top-0": true }]);
  return <header className={className01}>{children}</header>;
};

const NavBar: IReactFC = ({ children }) => {
  const className01 = tailwindClassResolve(["text-brand-50", "bg-brand-600", "border-brand-900"]);
  return (
    <Header className={`border-b border-brand-500`}>
      <nav className={className01}>{children}</nav>
    </Header>
  );
};

export default NavBar;
