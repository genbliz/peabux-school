import { tailwindClassResolve } from "@/helper/util";
import { IReactFC } from "@/types";

interface ISvgBase {
  boxSize?: number;
  className?: string;
  viewBox: string;
  fill?: string;
  stroke?: string;
}

const SvgBase: IReactFC<ISvgBase> = ({ boxSize, children, className, fill, stroke, viewBox }) => {
  const className01 = tailwindClassResolve(["inline-block", className]);
  return (
    <svg
      width={boxSize}
      height={boxSize}
      viewBox={viewBox}
      className={className01}
      fill={fill}
      stroke={stroke}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
};

export default SvgBase;
