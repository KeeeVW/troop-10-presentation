import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  glow?: string;
  onClick?: () => void;
  noAdvance?: boolean;
  delay?: number;
};

export function InteractivePanel({
  children,
  className = "",
  style,
  glow,
  onClick,
  noAdvance,
  delay = 0,
}: Props) {
  const common = {
    className: `panel panel-interactive ${className}`.trim(),
    style: {
      ...style,
      ["--panel-glow" as string]: glow ?? "rgba(42,82,64,0.18)",
    } as CSSProperties,
    initial: { opacity: 0, y: 22, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    whileHover: { y: -4, scale: 1.015 },
    whileTap: { scale: 0.985 },
    transition: { type: "spring" as const, stiffness: 320, damping: 24, delay },
  };

  const interactiveProps = onClick
    ? {
        type: "button" as const,
        onClick,
        "data-no-advance": noAdvance ? true : undefined,
      }
    : {};

  if (onClick) {
    return <motion.button {...common} {...interactiveProps}>{children}</motion.button>;
  }

  return <motion.div {...common}>{children}</motion.div>;
}
