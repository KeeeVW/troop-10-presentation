import { useCallback, useEffect, useMemo, useState } from "react";
import { sections, type SectionId } from "@/content/presentation";

export type RouteId =
  | "opening"
  | "toc"
  | SectionId
  | "closing";

export type PresentationState = {
  route: RouteId;
  step: number;
};

const MAIN_FLOW: RouteId[] = [
  "opening",
  "toc",
  "swot",
  "vision",
  "plan",
  "cadre",
  "closing",
];

type Options = {
  maxSteps: Record<RouteId, number>;
};

export function usePresentation({ maxSteps }: Options) {
  const [route, setRoute] = useState<RouteId>("opening");
  const [step, setStep] = useState(0);

  const routeIndex = MAIN_FLOW.indexOf(route);
  const totalRoutes = MAIN_FLOW.length;
  const currentMax = Math.max(0, (maxSteps[route] ?? 1) - 1);

  const progress = useMemo(() => {
    const base = routeIndex / totalRoutes;
    const within = currentMax <= 0 ? 0 : step / (currentMax + 1) / totalRoutes;
    return Math.min(0.99, base + within);
  }, [routeIndex, step, currentMax, totalRoutes]);

  const goTo = useCallback((next: RouteId, nextStep = 0) => {
    setRoute(next);
    setStep(Math.max(0, nextStep));
  }, []);

  const next = useCallback(() => {
    if (step < currentMax) {
      setStep((s) => s + 1);
      return;
    }
    if (routeIndex < MAIN_FLOW.length - 1) {
      setRoute(MAIN_FLOW[routeIndex + 1]);
      setStep(0);
    }
  }, [step, currentMax, routeIndex]);

  const prev = useCallback(() => {
    if (step > 0) {
      setStep((s) => s - 1);
      return;
    }
    if (routeIndex > 0) {
      const prevRoute = MAIN_FLOW[routeIndex - 1];
      const prevMax = Math.max(0, (maxSteps[prevRoute] ?? 1) - 1);
      setRoute(prevRoute);
      setStep(prevMax);
    }
  }, [step, routeIndex, maxSteps]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp" || e.key === "Backspace") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo("opening");
      } else if (e.key === "End") {
        e.preventDefault();
        goTo("closing");
      } else if (e.key >= "1" && e.key <= "4") {
        e.preventDefault();
        goTo(sections[Number(e.key) - 1].id);
      } else if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        goTo("toc");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, goTo]);

  useEffect(() => {
    let acc = 0;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 8) return;
      acc += e.deltaY;
      if (Math.abs(acc) < 90) return;
      const dir = acc > 0 ? 1 : -1;
      acc = 0;
      if (dir > 0) next();
      else prev();
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [next, prev]);

  const sectionMeta = sections.find((s) => s.id === route);

  return {
    route,
    step,
    setStep,
    goTo,
    next,
    prev,
    progress,
    sectionMeta,
    routeIndex,
  };
}
