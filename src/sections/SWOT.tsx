import { AnimatePresence, motion } from "framer-motion";
import { InteractivePanel } from "@/components/InteractivePanel";
import { MixedText } from "@/components/MixedText";
import { swot } from "@/content/presentation";
import { cinematic, zoomIn, zoomOut, cinematicFast } from "@/motion/presets";

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
  { id: "strengths", en: "Strengths", tone: "var(--strength)", glow: "rgba(138,154,91,0.22)", jumpTo: 1 },
  { id: "weaknesses", en: "Weaknesses", tone: "var(--weakness)", glow: "rgba(169,77,59,0.22)", jumpTo: 4 },
  { id: "opportunities", en: "Opportunities", tone: "var(--opportunity)", glow: "rgba(122,138,77,0.2)", jumpTo: 5 },
  { id: "threats", en: "Threats", tone: "var(--threat)", glow: "rgba(125,82,82,0.18)", jumpTo: 6 },
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
        <div style={{ marginBottom: "0.9rem", flexShrink: 0 }}>
          <p className="eyebrow">1 — SWOT ANALYSIS</p>
          <motion.h2
            className="en"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: "var(--font-en)", fontSize: "clamp(1.8rem, 3.4vw, 2.5rem)", fontWeight: 700, color: "var(--green-deep)", margin: 0 }}
          >
            SWOT ANALYSIS
          </motion.h2>
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
                  gap: "1.1rem",
                  minHeight: 0,
                }}
              >
                {AREAS.map((a, i) => (
                  <InteractivePanel
                    key={a.id}
                    noAdvance
                    onClick={() => setStep(a.jumpTo)}
                    delay={0.1 * i}
                    glow={a.glow}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      minHeight: 0,
                      height: "100%",
                      borderTop: `4px solid ${a.tone}`,
                      textAlign: "right",
                      padding: "1.35rem 1.45rem",
                    }}
                  >
                    <motion.span
                      className="en"
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 3.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                      style={{
                        fontSize: "clamp(1.95rem, 3.4vw, 2.8rem)",
                        letterSpacing: "0.05em",
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
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "0.8rem",
                    marginTop: "1.2rem",
                    flex: 1,
                    minHeight: 0,
                    alignContent: "start",
                    alignItems: "stretch",
                    overflow: "auto",
                    padding: "0.2rem 0.1rem 0.5rem",
                  }}
                >
                  {swot.weaknesses.points.map((p, i) => (
                    <InteractivePanel
                      key={p}
                      delay={0.12 * i}
                      glow="rgba(169,77,59,0.2)"
                      style={{
                        width: "100%",
                        padding: "1rem 1.2rem",
                        minHeight: "fit-content",
                        display: "block",
                        background: "rgba(169,77,59,0.04)",
                        borderLeft: "4px solid var(--weakness)",
                        borderTop: "0",
                        boxShadow: "inset 0 0 0 1px rgba(169,77,59,0.12)",
                      }}
                    >
                      <MixedText text={p} as="p" className="body-md" style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)", margin: 0, color: "var(--ink-soft)" }} />
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
                    gap: "1rem",
                    marginTop: "1.35rem",
                    width: "100%",
                  }}
                >
                  {swot.opportunities.points.map((p, i) => (
                    <InteractivePanel
                      key={p}
                      delay={0.12 * i}
                      glow="rgba(122,138,77,0.16)"
                      style={{
                        flex: "1 1 0",
                        minWidth: 0,
                        alignSelf: "stretch",
                        height: "auto",
                        minHeight: "15rem",
                        padding: "1.35rem 1.35rem",
                        display: "flex",
                        flexDirection: "column",
                        borderTop: "4px solid var(--opportunity)",
                      }}
                    >
                      <span className="en" style={{ fontSize: "2.2rem", fontWeight: 700, color: "var(--opportunity)", opacity: 0.3, lineHeight: 1 }}>
                        {i + 1}
                      </span>
                      <MixedText
                        text={p}
                        as="p"
                        style={{ marginTop: "0.9rem", fontSize: "clamp(1.08rem, 1.5vw, 1.3rem)", lineHeight: 1.7, color: "var(--ink-soft)", flex: 1 }}
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
                    marginTop: "1.35rem",
                    flex: 1,
                    minHeight: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    overflow: "auto",
                  }}
                >
                  {swot.threats.cycle.map((node, i) => (
                    <motion.div
                      key={node}
                      initial={{ opacity: 0, x: 20, scale: 0.92 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ delay: cinematicFast.duration * 0.3 + i * 0.15, ...cinematicFast }}
                      style={{ display: "flex", direction: "rtl" }}
                    >
                      <InteractivePanel
                        glow="rgba(125,82,82,0.14)"
                        style={{
                          flex: 1,
                          padding: "1rem 1.2rem",
                          borderLeft: "4px solid var(--threat)",
                          height: "fit-content",
                        }}
                      >
                        <MixedText text={node} as="p" className="body-md" style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.2rem)" }} />
                      </InteractivePanel>
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
      <motion.h3
        className="en"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          margin: 0,
          color: tone,
          fontFamily: "var(--font-en)",
          fontSize: "clamp(1.55rem, 2.8vw, 2.15rem)",
          letterSpacing: "0.05em",
          fontWeight: 700,
        }}
      >
        {en}
      </motion.h3>
    </div>
  );
}

function StrengthsView({ clusterIndex }: { clusterIndex: number }) {
  const cluster = swot.strengths.clusters[clusterIndex];

  return (
    <motion.div
      {...zoomIn}
      transition={cinematic}
      style={{
        height: "100%",
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        maxHeight: "100%",
      }}
    >
      <AreaHeader en="Strengths" tone="var(--strength)" />

      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", marginBottom: "0.85rem", flexWrap: "wrap", flexShrink: 0 }}>
        {swot.strengths.clusters.map((c, i) => (
          <motion.span
            key={c.id}
            className="tag ar"
            animate={{
              opacity: i === clusterIndex ? 1 : 0.35,
              scale: i === clusterIndex ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
            style={{
              background: i === clusterIndex ? "rgba(138,154,91,0.15)" : "transparent",
              fontSize: "0.65rem",
              cursor: "pointer",
            }}
          >
            {c.label}
          </motion.span>
        ))}
      </div>

      <h4 className="ar" style={{ marginBottom: "0.7rem", color: "var(--green-deep)", fontSize: "clamp(1.2rem, 2.2vw, 1.55rem)", fontWeight: 700, flexShrink: 0 }}>
        {cluster.label}
      </h4>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateRows: "repeat(auto-fit, minmax(0, min-content))",
          alignContent: "start",
          gap: "0.7rem",
          overflow: "hidden",
        }}
      >
        {cluster.points.map((point, i) => (
          <InteractivePanel
            key={point.id}
            delay={0.08 * i}
            glow="rgba(138,154,91,0.14)"
            style={{
              padding: "0.85rem 1rem",
              width: "100%",
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderTop: "4px solid var(--strength)",
              overflow: "hidden",
            }}
          >
            <MixedText
              text={point.text}
              as="p"
              style={{
                margin: 0,
                fontSize: "clamp(0.96rem, 1.25vw, 1.14rem)",
                lineHeight: 1.45,
                color: "var(--ink-soft)",
                overflowWrap: "anywhere",
                wordBreak: "break-word",
              }}
            />

            {"results" in point && point.results && (
              <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", marginTop: "0.7rem" }}>
                {point.results.map((r) => (
                  <MixedText
                    key={r}
                    text={r}
                    as="span"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "0.35rem 0.75rem",
                      background: "rgba(138,154,91,0.1)",
                      borderRight: "3px solid var(--green-mid)",
                      borderRadius: "999px",
                      fontSize: "clamp(0.85rem, 1.1vw, 1rem)",
                      lineHeight: 1.3,
                      overflowWrap: "anywhere",
                      wordBreak: "break-word",
                    }}
                  />
                ))}
              </div>
            )}

            {"enables" in point && point.enables && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "0.45rem", marginTop: "0.7rem" }}>
                {point.enables.map((e) => (
                  <span
                    key={e}
                    className="ar"
                    style={{
                      textAlign: "center",
                      padding: "0.5rem 0.35rem",
                      background: "rgba(125,97,71,0.08)",
                      fontSize: "clamp(0.8rem, 1vw, 0.92rem)",
                      borderRadius: "0.85rem",
                      lineHeight: 1.4,
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
