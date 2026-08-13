export const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
};

export const zoomIn = {
  initial: { opacity: 0, scale: 1.08 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.94 },
};

export const zoomOut = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.06 },
};

export const softFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const cinematic = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as const,
};
