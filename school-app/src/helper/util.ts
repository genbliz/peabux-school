import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function tailwindClassResolve(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
