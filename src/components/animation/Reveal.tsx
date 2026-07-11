import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type RevealVariant = "fade-up" | "fade-left";

type RevealProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

const Reveal = <T extends ElementType = "div">({
  as,
  children,
  className,
  variant = "fade-up",
  ...restProps
}: RevealProps<T>) => {
  const Component = (as || "div") as ElementType;
  return (
    <Component data-animate={variant} className={className} {...restProps}>
      {children}
    </Component>
  );
};

export default Reveal;
