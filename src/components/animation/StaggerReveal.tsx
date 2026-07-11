import { Children, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react";

type StaggerRevealProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  itemClassName?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

const StaggerReveal = <T extends ElementType = "div">({
  as,
  children,
  className,
  itemClassName,
  ...restProps
}: StaggerRevealProps<T>) => {
  const Component = (as || "div") as ElementType;
  const childArray = Children.toArray(children);

  return (
    <Component data-animate="stagger" className={className} {...restProps}>
      {childArray.map((child, index) => (
        <div key={index} data-stagger-item className={itemClassName}>
          {child}
        </div>
      ))}
    </Component>
  );
};

export default StaggerReveal;
