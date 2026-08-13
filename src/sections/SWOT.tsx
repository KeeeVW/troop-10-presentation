import { AnimatePresence, motion } from "framer-motion";
import { InteractivePanel } from "@/components/InteractivePanel";
import { MixedText } from "@/components/MixedText";
import { swot } from "@/content/presentation";
import { cinematic, zoomIn, zoomOut } from "@/motion/presets";

type Area = "overview" | "strengths" | "weaknesses" | "opportunities" | "threats";

type Props = {
  step: number;
  setStep: (step: number) => void;
};

const AREAS: {
  id: Exclude<Area, "overview">;
  en: string;
  tone: string;
  glow: string;
  jumpTo: number;
}[] = [
  { id: "strengths", en: "Strengths", tone: "var(--strength)", glow: "rgba(42,82,64,0.28)", jumpTo: 1 },
  { id: "weaknesses", en: "Weaknesses", tone: "var(--weakness)", glow: "rgba(127,58,48,0.22)", jumpTo: 4 },
  { id: "opportunities", en: "Opportunities", tone: "var(--opportunity)", glow: "rgba(85,102,58,0.26)", jumpTo: 5 },
  { id: "threats", en: "Threats", tone: "var(--threat)", glow: "rgba(106,56,56,0.24)", jumpTo: 6 },
];

export const SWOT_STEPS = 7;

function resolveArea(step: number): Area {
  if (step === 0) return "overview";
  if (step >= 1 && step <= 3) return "strengths";
  if (step === 4) return "weaknesses";
  if (step === 5) return "opportunities";
  return "threats";
}

export function SWOT({ step, setStep }: Props) {
  const area = resolveArea(step);
  const clusterIndex = step - 1;

  return (
    <motion.section className="stage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div style={{ maxWidth: "74rem", width: "100%", margin: "0 auto", flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
        <div style={{ marginBottom: "0.75rem", flexShrink: 0 }}>
          <p className="eyebrow">1 — SWOT ANALYSIS</p>
          <h2 className="en" style={{ fontFamily: "var(--font-en)", fontSize: "clamp(1.7rem, 3.2vw, 2.4rem)", fontWeight: 700, color: "var(--green-deep)", margin: 0 }}>
            SWOT ANALYSIS
          </h2>
        </div>

        <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
          <AnimatePresence mode="wait">
            {area === "overview" && (
              <motion.div
                key="overview"
                {...zoomOut}
                transition={cinematic}
                style={{
                  height: "100%",
                  maxHeight: "100%",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridTemplateRows: "1fr 1fr",
                  gap: "0.9rem",
                  minHeight: 0,
                }}
              >
                {AREAS.map((a, i) => (
                  <InteractivePanel
                    key={a.id}
                    noAdvance
                    onClick={() => setStep(a.jumpTo)}
                    delay={0.08 * i}
                    glow={a.glow}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      minHeight: 0,
                      height: "100%",
                      borderTop: `3px solid ${a.tone}`,
                      textAlign: "right",
                      padding: "1rem 1.2rem",
                    }}
                  >
                    <motion.span
                      className="en"
                      animate={{ opacity: [0.85, 1, 0.85] }}
                      transition={{ duration: 3.2 + i * 0.25, repeat: Infinity, ease: "easeInOut" }}
                      style={{
                        fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                        letterSpacing: "0.04em",
                        color: a.tone,
                        fontWeight: 700,
                        lineHeight: 1.15,
                      }}
                    >
                      {a.en}
                    </motion.span>
                  </InteractivePanel>
                ))}
              </motion.div>
            )}

            {area === "strengths" && (
              <StrengthsView key={`str-${clusterIndex}`} clusterIndex={Math.min(2, Math.max(0, clusterIndex))} />
            )}

            {area === "weaknesses" && (
              <motion.div
                key="weak"
                {...zoomIn}
                transition={cinematic}
                style={{ height: "100%", minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}
              >
                <AreaHeader en="Weaknesses" tone="var(--weakness)" />
                <div style={{ display: "grid", gap: "0.75rem", marginTop: "1rem", flex: 1, minHeight: 0, alignContent: "start" }}>
                  {swot.weaknesses.points.map((p, i) => (
                    <InteractivePanel key={p} delay={0.1 * i} glow="rgba(127,58,48,0.16)" style={{ padding: "0.9rem 1.1rem" }}>
                      <MixedText text={p} as="p" className="body-md" />
                    </InteractivePanel>
                  ))}
                </div>
              </motion.div>
            )}

            {area === "opportunities" && (
              <motion.div
                key="opp"
                {...zoomIn}
                transition={cinematic}
                style={{ height: "100%", minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}
              >
                <AreaHeader en="Opportunities" tone="var(--opportunity)" />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    alignItems: "stretch",
                    gap: "0.9rem",
                    marginTop: "1.25rem",
                    width: "100%",
                  }}
                >
                  {swot.opportunities.points.map((p, i) => (
                    <InteractivePanel
                      key={p}
                      delay={0.1 * i}
                      glow="rgba(85,102,58,0.2)"
                      style={{
                        flex: "1 1 0",
                        minWidth: 0,
                        alignSelf: "stretch",
                        height: "auto",
                        minHeight: "14rem",
                        padding: "1.15rem 1.2rem",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span className="en" style={{ fontSize: "1.85rem", fontWeight: 700, color: "var(--opportunity)", opacity: 0.35 }}>
                        {i + 1}
                      </span>
                      <MixedText
                        text={p}
                        as="p"
                        style={{ marginTop: "0.75rem", fontSize: "clamp(1rem, 1.4vw, 1.2rem)", lineHeight: 1.65, color: "var(--ink-soft)", flex: 1 }}
                      />
                    </InteractivePanel>
                  ))}
                </div>
              </motion.div>
            )}

            {area === "threats" && (
              <motion.div
                key="thr"
                {...zoomIn}
                transition={cinematic}
                style={{ height: "100%", minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}
              >
                <AreaHeader en="Threats" tone="var(--threat)" />
                <div
                  style={{
                    marginTop: "1.25rem",
                    flex: 1,
                    minHeight: 0,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.55rem",
                    flexWrap: "wrap",
                    direction: "rtl",
                  }}
                >
                  {swot.threats.cycle.map((node, i) => (
                    <motion.div
                      key={node}
                      initial={{ opacity: 0, scale: 0.88 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.18 * i }}
                      style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.55rem", maxWidth: "17.5rem", direction: "rtl" }}
                    >
                      <InteractivePanel
                        glow="rgba(106,56,56,0.2)"
                        delay={0.12 * i}
                        style={{ borderColor: "rgba(106,56,56,0.28)", padding: "0.85rem 1rem" }}
                      >
                        <MixedText text={node} as="p" className="body-md" style={{ fontSize: "0.95rem" }} />
                      </InteractivePanel>
                      {i < swot.threats.cycle.length - 1 && (
                        <motion.span
                          className="en"
                          animate={{ x: [0, -4, 0], opacity: [0.35, 0.7, 0.35] }}
                          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                          style={{ fontSize: "1.5rem", color: "var(--threat)", flexShrink: 0 }}
                        >
                          ←
                        </motion.span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

function AreaHeader({ en, tone }: { en: string; tone: string }) {
  return (
    <div style={{ flexShrink: 0 }}>
      <h3
        className="en"
        style={{
          margin: 0,
          color: tone,
          fontFamily: "var(--font-en)",
          fontSize: "clamp(1.45rem, 2.6vw, 2rem)",
          letterSpacing: "0.04em",
          fontWeight: 700,
        }}
      >
        {en}
      </h3>
    </div>
  );
}

function StrengthsView({ clusterIndex }: { clusterIndex: number }) {
  const cluster = swot.strengths.clusters[clusterIndex];
  return (
    <motion.div
      {...zoomIn}
      transition={cinematic}
      style={{ height: "100%", minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}
    >
      <AreaHeader en="Strengths" tone="var(--strength)" />
      <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.65rem", marginBottom: "0.65rem", flexWrap: "wrap", flexShrink: 0 }}>
        {swot.strengths.clusters.map((c, i) => (
          <motion.span
            key={c.id}
            className="tag ar"
            animate={{
              opacity: i === clusterIndex ? 1 : 0.35,
              scale: i === clusterIndex ? 1.04 : 1,
            }}
            style={{
              background: i === clusterIndex ? "rgba(42,82,64,0.12)" : "transparent",
              fontSize: "0.62rem",
            }}
          >
            {c.label}
          </motion.span>
        ))}
      </div>

      <h4 className="ar" style={{ marginBottom: "0.55rem", color: "var(--green-deep)", fontSize: "clamp(1.1rem, 2vw, 1.45rem)", fontWeight: 700, flexShrink: 0 }}>
        {cluster.label}
      </h4>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          alignContent: "start",
          gap: "0.7rem",
          overflow: "auto",
          paddingBottom: "0.5rem",
        }}
      >
        {cluster.points.map((point, i) => (
          <InteractivePanel
            key={point.id}
            delay={0.06 * i}
            glow="rgba(42,82,64,0.18)"
            style={{
              padding: "0.85rem 1.05rem",
              height: "fit-content",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <MixedText
              text={point.text}
              as="p"
              style={{ fontSize: "clamp(1.05rem, 1.55vw, 1.28rem)", lineHeight: 1.65, color: "var(--ink-soft)", margin: 0 }}
            />
            {"results" in point && point.results && (
              <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", marginTop: "0.65rem" }}>
                {point.results.map((r) => (
                  <MixedText
                    key={r}
                    text={r}
                    as="span"
                    style={{
                      display: "inline-block",
                      padding: "0.35rem 0.7rem",
                      background: "rgba(42,82,64,0.1)",
                      borderRight: "3px solid var(--green-mid)",
                      borderRadius: "999px",
                      fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                    }}
                  />
                ))}
              </div>
            )}
            {"enables" in point && point.enables && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.45rem", marginTop: "0.65rem" }}>
                {point.enables.map((e) => (
                  <span
                    key={e}
                    className="ar"
                    style={{
                      textAlign: "center",
                      padding: "0.5rem 0.3rem",
                      background: "rgba(106,74,52,0.08)",
                      fontSize: "clamp(0.85rem, 1.15vw, 1rem)",
                      borderRadius: "0.7rem",
                    }}
                  >
                    {e}
                  </span>
                ))}
              </div>
            )}
          </InteractivePanel>
        ))}
      </div>
    </motion.div>
  );
}
