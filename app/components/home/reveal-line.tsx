import type { ReactNode } from "react";

type RevealLineProps = {
  children: ReactNode;
  allowDescenders?: boolean;
};

export function RevealLine({
  children,
  allowDescenders = false,
}: RevealLineProps) {
  return (
    <span
      className={`line-mask block ${allowDescenders ? "overflow-visible" : "overflow-hidden"}`}
    >
      <span
        className={`line-inner block will-change-transform ${allowDescenders ? "pb-[0.14em]" : ""}`}
      >
        {children}
      </span>
    </span>
  );
}
