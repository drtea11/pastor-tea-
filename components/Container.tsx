import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-[95vw] max-w-[95vw] ${className}`}
    >
      {children}
    </div>
  );
}
