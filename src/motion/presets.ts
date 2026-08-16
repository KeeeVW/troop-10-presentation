export const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
};

export const zoomIn = {
  initial: { opacity: 0, scale: 1.12 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.88 },
};

export const zoomOut = {
  initial: { opacity: 0, scale: 0.88 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.12 },
};

export const softFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const cinematic = {
  duration: 0.58,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const cinematicFast = {
  duration: 0.42,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const cinematicSlow = {
  duration: 0.75,
  ease: [0.22, 1, 0.36, 1] as const,
};

// Dramatic zoom for section transitions
export const dramaticZoomIn = {
  initial: { opacity: 0, scale: 1.28 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.72 },
};

export const dramaticZoomOut = {
  initial: { opacity: 0, scale: 0.72 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.28 },
};

// Staggered reveals
export const staggerUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export const staggerScale = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};
