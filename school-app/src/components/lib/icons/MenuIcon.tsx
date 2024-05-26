import { IReactFC } from "@/types";
import SvgBase from "./SvgBase";

const MenuIcon: IReactFC<{ boxSize?: number; className?: string }> = ({ boxSize, className }) => {
  return (
    <SvgBase boxSize={boxSize} viewBox="0 0 17 14" className={className} fill="none">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 1h15M1 7h15M1 13h15"
      />
    </SvgBase>
  );
};

export default MenuIcon;
