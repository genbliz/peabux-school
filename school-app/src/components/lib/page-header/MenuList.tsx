import { usePathname } from "next/navigation";
import { IReactFC } from "@/types";
import { tailwindClassResolve } from "@/helper/util";
import { DefinedRoutes } from "@/helper/constants";
import TypographyLink from "../../TypographyLink";

interface IMenuItem {
  href: string;
  active?: boolean;
  renderAsButton?: boolean;
  targetBlank?: boolean;
  className?: string;
  handleClick?: () => void;
}

const MenuItem: IReactFC<IMenuItem> = ({ children, handleClick, href, className, targetBlank, renderAsButton }) => {
  const classNameCommon = tailwindClassResolve([
    //
    `block`,
    `text-white`,
    className,
  ]);

  const classNameActive = tailwindClassResolve([
    classNameCommon,
    "font-semibold underline",
    "md:font-semibold md:underline",
  ]);

  const currentPathName = usePathname();

  const isActive = href === currentPathName;
  const className02 = isActive ? classNameActive : tailwindClassResolve([classNameCommon]);

  return (
    <li onClick={() => handleClick && handleClick()}>
      <TypographyLink targetBlank={targetBlank} renderAsButton={renderAsButton} href={href} className={className02}>
        {children}
      </TypographyLink>
    </li>
  );
};

const Menu: IReactFC<{}> = ({ children }) => {
  const className01 = tailwindClassResolve([
    "font-medium flex flex-col items-center p-3 mt-4 rounded-lg gap-5",
    "md:p-0 md:pl-2 md:flex-row md:mt-0",
  ]);

  return <ul className={className01}>{children}</ul>;
};

const MenuList: IReactFC<{ handleClick?: () => void }> = ({ handleClick }) => {
  const classNameLink = tailwindClassResolve(["text-brand-50"]);

  return (
    <Menu>
      <MenuItem handleClick={handleClick} className={classNameLink} href={DefinedRoutes.home}>
        Dashboard
      </MenuItem>

      <MenuItem handleClick={handleClick} className={classNameLink} href={DefinedRoutes.students}>
        Students
      </MenuItem>

      <MenuItem handleClick={handleClick} className={classNameLink} href={DefinedRoutes.teachers}>
        Teachers
      </MenuItem>
    </Menu>
  );
};

export default MenuList;
