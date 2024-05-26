import { tailwindClassResolve } from "@/helper/util";
import { IReactFC } from "@/types";
import NavLink from "next/link";

interface ITypographyLink {
  className?: string;
  renderAsButton?: boolean;
  href: string;
  targetBlank?: boolean;
  color?: "blue" | "brand";
  underline?: boolean;
}

const TypographyLink: IReactFC<ITypographyLink> = ({
  children,
  className,
  href,
  targetBlank,
  color,
  renderAsButton,
  underline,
}) => {
  const classNameButton = tailwindClassResolve([
    "focus:outline-none font-medium rounded-lg text-md whitespace-nowrap",
    "hover:opacity-70",
    "px-5 py-2.5 text-center",
    className,
  ]);

  const className01 = renderAsButton
    ? classNameButton
    : tailwindClassResolve([
        "font-medium hover:underline",
        "text-blue-600",
        { "text-brand-600": color === "brand" },
        { underline: underline },
        className,
      ]);

  return (
    <NavLink href={href} target={targetBlank ? "_blank" : undefined} className={className01}>
      {children}
    </NavLink>
  );
};

export default TypographyLink;
