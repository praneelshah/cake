import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  // No clip-path variant here on purpose: this component observes the very
  // element it animates, and an element clipped to zero size never reaches a
  // non-zero IntersectionObserver threshold, so it could never reveal itself.
  variant?: "up" | "zoom" | "left" | "right" | "blur" | "rise";
  className?: string;
};

export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  variant = "up",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal reveal-${variant} ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
