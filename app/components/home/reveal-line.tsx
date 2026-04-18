import { m, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

type RevealLineProps = {
  children: ReactNode;
  allowDescenders?: boolean;
  lineProps?: HTMLMotionProps<"span">;
};

export function RevealLine({
  children,
  allowDescenders = false,
  lineProps,
}: RevealLineProps) {
  return (
    <span
      className={`line-mask block ${allowDescenders ? "overflow-visible" : "overflow-hidden"}`}
    >
      <m.span
        {...lineProps}
        className={`line-inner block will-change-transform ${allowDescenders ? "pb-[0.14em]" : ""}`}
      >
        {children}
      </m.span>
    </span>
  );
}
