import { tailwindClassResolve } from "@/helper/util";
import { IReactFC } from "@/types";

interface ITypographyHeading {
  className?: string;
  renderAs?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const TypographyHeading: IReactFC<ITypographyHeading> = ({ children, className, renderAs }) => {
  const classNameCommon = "font-bold";

  if (renderAs === "h1") {
    const className01 = tailwindClassResolve([classNameCommon, "text-5xl", className]);
    return <h1 className={className01}>{children}</h1>;
  }

  if (renderAs === "h2") {
    const className01 = tailwindClassResolve([classNameCommon, "text-4xl", className]);
    return <h2 className={className01}>{children}</h2>;
  }

  if (renderAs === "h3") {
    const className01 = tailwindClassResolve([classNameCommon, "text-3xl", className]);
    return <h3 className={className01}>{children}</h3>;
  }

  if (renderAs === "h4") {
    const className01 = tailwindClassResolve([classNameCommon, "text-2xl", className]);
    return <h4 className={className01}>{children}</h4>;
  }

  if (renderAs === "h5") {
    const className01 = tailwindClassResolve([classNameCommon, "text-xl", className]);
    return <h5 className={className01}>{children}</h5>;
  }

  if (renderAs === "h6") {
    const className01 = tailwindClassResolve([classNameCommon, "text-lg", className]);
    return <h6 className={className01}>{children}</h6>;
  }

  const className01 = tailwindClassResolve([classNameCommon, "tracking-wide9 text-4xl md:text-5xl", className]);

  return <h1 className={className01}>{children}</h1>;
};

export default TypographyHeading;
