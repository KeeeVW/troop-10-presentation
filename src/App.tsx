import { AnimatePresence } from "framer-motion";
import { sections, type SectionId } from "@/content/presentation";
import { usePresentation, type RouteId } from "@/hooks/usePresentation";
import { Opening } from "@/sections/Opening";
import { TableOfContents } from "@/sections/TableOfContents";
import { SWOT, SWOT_STEPS } from "@/sections/SWOT";
import { Vision, VISION_STEPS } from "@/sections/Vision";
import { YearPlan, PLAN_STEPS } from "@/sections/YearPlan";
import { Cadre, CADRE_STEPS } from "@/sections/Cadre";
import { Closing } from "@/sections/Closing";

const maxSteps: Record<RouteId, number> = {
  opening: 1,
  toc: 1,
  swot: SWOT_STEPS,
  vision: VISION_STEPS,
  plan: PLAN_STEPS,
  cadre: CADRE_STEPS,
  closing: 1,
};

export default function App() {
  const { route, step, setStep, goTo, next, progress, sectionMeta } = usePresentation({ maxSteps });

  const showChrome = route !== "opening" && route !== "toc" && route !== "closing";

  return (
    <div
      className="app-shell"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest("button, a, input, textarea, [data-no-advance]")) return;
        next();
      }}
    >
      <div className="atmosphere-line" />
      <div className="veil" />
      <div className="grain" />

      <div className="progress-rail" aria-hidden>
        <span style={{ width: `${progress * 100}%` }} />
      </div>

      {showChrome && sectionMeta && (
        <div className="section-chip">
          <span className="num">{sectionMeta.number}</span>
          <span className="label">{sectionMeta.title}</span>
        </div>
      )}

      {showChrome && (
        <div className="section-indicator" aria-hidden>
          {sections.map((s) => {
            const idx = sections.findIndex((x) => x.id === route);
            const self = sections.findIndex((x) => x.id === s.id);
            const cls = self === idx ? "active" : self < idx ? "done" : "";
            return <span key={s.id} className={`dot ${cls}`} />;
          })}
        </div>
      )}

      {route !== "opening" && (
        <nav className="toc-mini" aria-label="Section jump">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              className={route === s.id ? "active" : ""}
              onClick={() => goTo(s.id)}
            >
              {s.number} {s.title}
            </button>
          ))}
        </nav>
      )}

      <AnimatePresence mode="wait">
        {route === "opening" && <Opening key="opening" onContinue={next} />}
        {route === "toc" && (
          <TableOfContents key="toc" onSelect={(id: SectionId) => goTo(id)} onContinue={next} />
        )}
        {route === "swot" && <SWOT key="swot" step={step} setStep={setStep} />}
        {route === "vision" && <Vision key="vision" step={step} />}
        {route === "plan" && <YearPlan key="plan" step={step} />}
        {route === "cadre" && <Cadre key="cadre" step={step} />}
        {route === "closing" && <Closing key="closing" />}
      </AnimatePresence>
    </div>
  );
}
