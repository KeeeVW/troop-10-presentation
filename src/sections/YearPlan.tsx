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
        <div style={{ marginBottom: "1rem", flexShrink: 0 }}>
          <p className="eyebrow">3 — 3 YEARS PLAN</p>
          <motion.h2
            className="en display-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: "var(--font-en)", fontSize: "clamp(1.9rem, 3.8vw, 2.7rem)", fontWeight: 700, color: "var(--green-deep)" }}
          >
            3 Years Plan
          </motion.h2>
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
      style={{ height: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.35rem", alignContent: "center" }}
    >
      {yearPlan.years.map((y, i) => (
        <InteractivePanel
          key={y.year}
          delay={0.15 * i}
          glow="rgba(138,154,91,0.18)"
          style={{
            minHeight: "13rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "1.75rem 1.85rem",
            borderTop: "4px solid var(--green-mid)",
          }}
        >
          <span className="en" style={{ fontSize: "clamp(2.8rem, 5.2vw, 4.2rem)", fontWeight: 800, color: "var(--green-deep)", lineHeight: 0.95 }}>
            {y.year}
          </span>
          <span className="en muted" style={{ marginTop: "0.85rem", letterSpacing: "0.1em", fontSize: "0.88rem" }}>
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
      <motion.h3
        className="en"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ marginBottom: "0.85rem", fontFamily: "var(--font-en)", fontSize: "clamp(1.6rem, 3vw, 2.1rem)", fontWeight: 700, color: "var(--green-deep)", flexShrink: 0 }}
      >
        {year.year}
      </motion.h3>

      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", gap: "0.9rem", overflow: "hidden" }}>
        <InteractivePanel
          key={primary.name}
          delay={0}
          glow="rgba(138,154,91,0.14)"
          style={{ padding: "1rem 1.2rem", flexShrink: 0, borderTop: "4px solid var(--green-mid)", height: "fit-content" }}
        >
          <p className="en" style={{ fontWeight: 700, letterSpacing: "0.12em", color: "var(--brown)", marginBottom: "0.65rem", fontSize: "0.88rem" }}>
            {primary.name}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(primary.items.length, 5)}, minmax(0, 1fr))`,
              gap: "0.7rem",
            }}
          >
            {primary.items.map((item) => (
              <motion.div
                key={`${item.label}-${item.value}`}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.08 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.3rem",
                  padding: "0.65rem 0.7rem",
                  background: "rgba(138,154,91,0.08)",
                  borderRadius: "0.9rem",
                  minWidth: 0,
                  textAlign: "center",
                }}
              >
                <span className="en" style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.75rem)", fontWeight: 700, color: "var(--green-deep)", lineHeight: 1 }}>
                  {item.value}
                </span>
                <MixedText text={item.label} as="span" style={{ fontSize: "0.85rem", lineHeight: 1.4, color: "var(--ink-soft)" }} />
              </motion.div>
            ))}
          </div>
        </InteractivePanel>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "grid",
            gridTemplateColumns: `repeat(${rest.length}, minmax(0, 1fr))`,
            gap: "0.9rem",
            alignContent: "stretch",
            overflow: "auto",
          }}
        >
          {rest.map((g, i) => (
            <InteractivePanel
              key={g.name}
              delay={0.1 * (i + 1)}
              glow="rgba(138,154,91,0.12)"
              style={{ padding: "1rem 1.15rem", display: "flex", flexDirection: "column", minHeight: 0, borderTop: "4px solid var(--brown-light)" }}
            >
              <p className="en" style={{ fontWeight: 700, letterSpacing: "0.12em", color: "var(--brown)", marginBottom: "0.65rem", fontSize: "0.88rem" }}>
                {g.name}
              </p>
              <div style={{ display: "grid", gap: "0.5rem", flex: 1, minHeight: 0, overflow: "auto" }}>
                {g.items.map((item) => (
                  <div
                    key={`${item.label}-${item.value}`}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: "0.7rem",
                      borderBottom: "1px solid rgba(125,97,71,0.12)",
                      paddingBottom: "0.4rem",
                    }}
                  >
                    <MixedText text={item.label} as="span" style={{ fontSize: "0.95rem", lineHeight: 1.45, color: "var(--ink-soft)" }} />
                    <span className="en" style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--green-deep)", flexShrink: 0 }}>
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
