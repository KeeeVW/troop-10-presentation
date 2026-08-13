import { AnimatePresence, motion } from "framer-motion";
import { InteractivePanel } from "@/components/InteractivePanel";
import { MixedText } from "@/components/MixedText";
import { yearPlan } from "@/content/presentation";
import { cinematic, zoomIn, zoomOut } from "@/motion/presets";

type Props = {
  step: number;
};

/** 0 overview · 1 year 2027 · 2 year 2028 */
export const PLAN_STEPS = 3;

export function YearPlan({ step }: Props) {
  return (
    <motion.section className="stage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div style={{ maxWidth: "74rem", width: "100%", margin: "0 auto", flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "0.85rem" }}>
          <p className="eyebrow">3 — 3-YEAR PLAN</p>
          <h2 className="en display-lg" style={{ fontFamily: "var(--font-en)", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}>
            3-YEAR PLAN
          </h2>
        </div>

        <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            {step === 0 && <Overview key="ov" />}
            {step === 1 && <YearView key="y27" year={yearPlan.years[0]} />}
            {step === 2 && <YearView key="y28" year={yearPlan.years[1]} />}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

function Overview() {
  return (
    <motion.div
      {...zoomOut}
      transition={cinematic}
      style={{ height: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.1rem", alignContent: "center" }}
    >
      {yearPlan.years.map((y, i) => (
        <InteractivePanel
          key={y.year}
          delay={0.12 * i}
          glow="rgba(42,82,64,0.2)"
          style={{
            minHeight: "11rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "1.5rem",
            borderTop: "3px solid var(--green-mid)",
          }}
        >
          <span className="en" style={{ fontSize: "clamp(2.6rem, 5vw, 4rem)", fontWeight: 800, color: "var(--green-deep)", lineHeight: 1 }}>
            {y.year}
          </span>
          <span className="en muted" style={{ marginTop: "0.7rem", letterSpacing: "0.08em", fontSize: "0.85rem" }}>
            {y.groups.map((g) => g.name).join(" · ")}
          </span>
        </InteractivePanel>
      ))}
    </motion.div>
  );
}

function YearView({ year }: { year: (typeof yearPlan.years)[number] }) {
  const [primary, ...rest] = year.groups;

  return (
    <motion.div {...zoomIn} transition={cinematic} style={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
      <h3 className="en" style={{ marginBottom: "0.65rem", fontFamily: "var(--font-en)", fontSize: "clamp(1.45rem, 2.6vw, 1.9rem)", fontWeight: 700, color: "var(--green-deep)", flexShrink: 0 }}>
        {year.year}
      </h3>

      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", gap: "0.65rem", overflow: "hidden" }}>
        <InteractivePanel
          key={primary.name}
          delay={0}
          style={{ padding: "0.75rem 1rem", flexShrink: 0 }}
        >
          <p className="en" style={{ fontWeight: 700, letterSpacing: "0.1em", color: "var(--brown)", marginBottom: "0.5rem", fontSize: "0.82rem" }}>
            {primary.name}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(primary.items.length, 5)}, minmax(0, 1fr))`,
              gap: "0.55rem",
            }}
          >
            {primary.items.map((item) => (
              <div
                key={`${item.label}-${item.value}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.2rem",
                  padding: "0.45rem 0.5rem",
                  background: "rgba(42,82,64,0.06)",
                  borderRadius: "0.65rem",
                  minWidth: 0,
                }}
              >
                <span className="en" style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.55rem)", fontWeight: 700, color: "var(--green-deep)", lineHeight: 1 }}>
                  {item.value}
                </span>
                <MixedText text={item.label} as="span" style={{ fontSize: "0.8rem", lineHeight: 1.35, color: "var(--ink-soft)" }} />
              </div>
            ))}
          </div>
        </InteractivePanel>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "grid",
            gridTemplateColumns: `repeat(${rest.length}, minmax(0, 1fr))`,
            gap: "0.65rem",
            alignContent: "stretch",
          }}
        >
          {rest.map((g, i) => (
            <InteractivePanel
              key={g.name}
              delay={0.06 * (i + 1)}
              style={{ padding: "0.75rem 0.9rem", display: "flex", flexDirection: "column", minHeight: 0 }}
            >
              <p className="en" style={{ fontWeight: 700, letterSpacing: "0.1em", color: "var(--brown)", marginBottom: "0.45rem", fontSize: "0.82rem" }}>
                {g.name}
              </p>
              <div style={{ display: "grid", gap: "0.35rem" }}>
                {g.items.map((item) => (
                  <div
                    key={`${item.label}-${item.value}`}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: "0.6rem",
                      borderBottom: "1px solid rgba(20,46,38,0.08)",
                      paddingBottom: "0.28rem",
                    }}
                  >
                    <MixedText text={item.label} as="span" style={{ fontSize: "0.88rem", lineHeight: 1.4, color: "var(--ink-soft)" }} />
                    <span className="en" style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--green-deep)", flexShrink: 0 }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </InteractivePanel>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
