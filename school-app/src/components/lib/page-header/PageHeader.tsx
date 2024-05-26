"use client";
import { useState, useEffect } from "react";
import { IReactFC } from "@/types";
import { tailwindClassResolve } from "@/helper/util";
import NavBar from "./NavBar";
import MenuList from "./MenuList";
import { DefinedRoutes } from "@/helper/constants";
import TypographyLink from "../../TypographyLink";
import LogoIcon from "../icons/LogoIcon";
import MenuIcon from "../icons/MenuIcon";

interface IMenuButton {
  className?: string;
  handleClick: () => void;
}

const MenuButton: IReactFC<IMenuButton> = ({ className, handleClick }) => {
  const className01 = tailwindClassResolve([
    `inline-flex items-center p-2 w-10 h-10 justify-center text-sm
    rounded-lg md:hidden focus:outline-none`,
    className,
  ]);

  return (
    <button type="button" className={className01} onClick={() => handleClick()}>
      <span className="sr-only">Open main menu</span>
      <MenuIcon />
    </button>
  );
};

const PageHeader: IReactFC<{ sticky?: boolean }> = ({ sticky }) => {
  const [canShow, setCanShow] = useState(false);

  const className01 = tailwindClassResolve([
    //
    `flex flex-wrap items-center justify-between mx-auto`,
    `p-2`,
    `md:p-4 select-none`,
  ]);

  const classNameMobileMenu = tailwindClassResolve([
    { hidden: !canShow },
    "w-full md:hidden border-t border-brandark-900 mb-4",
  ]);

  const classNameDesktopMenu = tailwindClassResolve(["hidden w-full md:block md:w-auto"]);

  const classNameNavLink = tailwindClassResolve(["flex items-center w-auto h-auto bg-transparent"]);

  return (
    <NavBar>
      <div className={className01}>
        <TypographyLink href={DefinedRoutes.home} className={classNameNavLink}>
          <LogoIcon boxSize={50} className="text-brand-400" />
        </TypographyLink>

        <MenuButton handleClick={() => setCanShow((prev) => !prev)} />

        <div className={classNameDesktopMenu}>
          <MenuList handleClick={() => setCanShow(false)} />
        </div>

        <div className={classNameMobileMenu}>
          <MenuList handleClick={() => setCanShow(false)} />
        </div>

        <div className="hidden md:block select-none">&nbsp;</div>
      </div>
    </NavBar>
  );
};

export default PageHeader;
