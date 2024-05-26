import Image from "next/image";
import { tailwindClassResolve } from "@/helper/util";
import type { IReactFC } from "@/types";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";

interface IAppImage {
  alt: string;
  src: string | StaticImport;
  height: number;
  width: number;
  className?: string;
  priority?: boolean;
  native?: false;
}

interface IAppImageNative {
  alt: string;
  src: string;
  height?: number;
  width?: number;
  className?: string;
  native: true;
}

const AppImage: IReactFC<IAppImage | IAppImageNative> = (props) => {
  const { src, height, width, className, alt } = props;

  const className01 = tailwindClassResolve(["", className]);

  if (props?.native) {
    return <img src={props.src} alt={alt} className={className01} width={width} height={height} />;
  }

  return <Image src={src} alt={alt} className={className01} width={width} height={height} priority={props.priority} />;
};

export default AppImage;
