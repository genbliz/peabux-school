import { IReactFC } from "@/types";
import SvgBase from "./SvgBase";

const LogoIcon: IReactFC<{ boxSize?: number; className?: string }> = ({ boxSize, className }) => {
  return (
    <SvgBase boxSize={boxSize} viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M21 10L12 5L3 10L6 11.6667M21 10L18 11.6667M21 10V10C21.6129 10.3064 22 10.9328 22 11.618V16.9998M6 11.6667L12 15L18 11.6667M6 11.6667V17.6667L12 21L18 17.6667L18 11.6667"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgBase>
  );
};

export default LogoIcon;
