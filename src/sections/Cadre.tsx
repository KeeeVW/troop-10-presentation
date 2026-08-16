import { AnimatePresence, motion } from "framer-motion";
import { InteractivePanel } from "@/components/InteractivePanel";
import { MixedText } from "@/components/MixedText";
import { cadre, type CadrePerson } from "@/content/presentation";
import { cinematic, zoomIn, zoomOut, cinematicFast } from "@/motion/presets";

type Props = {
  step: number;
};

/** 0 team overview · 1-4 each person */
export const CADRE_STEPS = 5;

export function Cadre({ step }: Props) {
  return (
    <motion.section className="stage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div style={{ maxWidth: "74rem", width: "100%", margin: "0 auto", flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "0.9rem", flexShrink: 0 }}>
          <p className="eyebrow">4 — CADRE ANALYSIS</p>
          <motion.h2
            className="en"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: "var(--font-en)", fontSize: "clamp(1.85rem, 3.4vw, 2.6rem)", fontWeight: 700, color: "var(--green-deep)", margin: 0 }}
          >
            CADRE ANALYSIS
          </motion.h2>
        </div>

        <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            {step === 0 && <TeamOverview key="team" />}
            {step >= 1 && step <= 4 && <Profile key={cadre[step - 1].id} person={cadre[step - 1]} index={step - 1} />}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

function TeamOverview() {
  return (
    <motion.div
      {...zoomOut}
      transition={cinematic}
      style={{
        height: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1.2rem",
        alignContent: "center",
      }}
    >
      {cadre.map((p, i) => (
        <InteractivePanel
          key={p.id}
          delay={0.12 * i}
          glow={["rgba(138,154,91,0.18)", "rgba(125,97,71,0.16)", "rgba(122,138,77,0.16)", "rgba(125,97,71,0.15)"][i]}
          style={{
            minHeight: "12rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "1.5rem 1.35rem",
            borderTop: `4px solid ${tone(i)}`,
          }}
        >
          <span className="en" style={{ fontSize: "clamp(1.75rem, 2.6vw, 2.35rem)", fontWeight: 800, color: "var(--green-deep)" }}>
            {p.name}
          </span>
          <span className="ar muted" style={{ marginTop: "0.7rem", fontSize: "0.92rem" }}>
            {summaryLabel(p)}
          </span>
        </InteractivePanel>
      ))}
    </motion.div>
  );
}

function Profile({ person, index }: { person: CadrePerson; index: number }) {
  const analysisOnly = Boolean(person.analysis && !person.strengths && !person.weaknesses);
  const dense = (person.analysis?.length ?? 0) >= 6;

  return (
    <motion.div
      {...zoomIn}
      transition={cinematic}
      style={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "1rem", flexShrink: 0 }}>
        <motion.h3
          className="en"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ fontFamily: "var(--font-en)", fontSize: "clamp(1.85rem, 3.2vw, 2.5rem)", fontWeight: 700, color: "var(--green-deep)", margin: 0 }}
        >
          {person.name}
        </motion.h3>
        <span className="en muted" style={{ letterSpacing: "0.12em", fontSize: "0.8rem" }}>
          {index + 1} / 4
        </span>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: analysisOnly ? "1fr" : "1fr 1fr",
          gap: "0.95rem",
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="wait">
          {person.strengths && (
            <motion.div
              key="strengths"
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.95 }}
              transition={cinematicFast}
            >
              <ListBlock title="نقاط قوة" tone="var(--strength)" items={person.strengths} extra={person.technicalSkills} />
            </motion.div>
          )}
          {person.weaknesses && (
            <motion.div
              key="weaknesses"
              initial={{ opacity: 0, x: -40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ ...cinematicFast, delay: person.strengths ? 0.2 : 0 }}
            >
              <ListBlock title="نقاط ضعف" tone="var(--weakness)" items={person.weaknesses} />
            </motion.div>
          )}
          {person.analysis && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={cinematicFast}
            >
              <ListBlock
                title="محتاج يتعلم"
                tone="var(--brown)"
                items={person.analysis}
                wide={analysisOnly}
                dense={dense || analysisOnly}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function ListBlock({
  title,
  tone,
  items,
  extra,
  wide,
  dense,
}: {
  title: string;
  tone: string;
  items: string[];
  extra?: string[];
  wide?: boolean;
  dense?: boolean;
}) {
  const columns = dense ? (items.length <= 6 ? 3 : 3) : 1;

  return (
    <InteractivePanel
      glow={tone}
      style={{
        borderTop: `3px solid ${tone}`,
        gridColumn: wide ? "1 / -1" : undefined,
        padding: dense ? "0.85rem 1rem" : "1.1rem 1.25rem",
        minHeight: 0,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <p className="ar" style={{ fontWeight: 700, marginBottom: dense ? "0.65rem" : "0.75rem", color: tone, flexShrink: 0 }}>
        {title}
      </p>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: dense ? `repeat(${columns}, minmax(0, 1fr))` : "1fr",
          gridAutoRows: "min-content",
          gap: dense ? "0.5rem" : "0.45rem",
          alignContent: "start",
          overflow: "hidden",
        }}
      >
        {items.map((item, i) => (
          <motion.div
            key={`${item}-${i}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i }}
            style={
              dense
                ? {
                    padding: "0.55rem 0.7rem",
                    background: "rgba(20,46,38,0.05)",
                    borderRadius: "0.75rem",
                    borderRight: `3px solid ${tone}`,
                  }
                : undefined
            }
          >
            <MixedText
              text={item}
              as="p"
              style={{
                margin: 0,
                fontSize: dense ? "clamp(0.88rem, 1.2vw, 1.05rem)" : "clamp(0.95rem, 1.25vw, 1.12rem)",
                lineHeight: 1.45,
                color: "var(--ink-soft)",
              }}
            />
            {item === "شاطر في فنيات" && extra && (
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.4rem" }}>
                {extra.map((e) => (
                  <span key={e} className="tag ar">
                    {e}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </InteractivePanel>
  );
}

function tone(i: number) {
  return ["#2a5240", "#6a4a34", "#55663a", "#3f2c20"][i] ?? "#2a5240";
}

function summaryLabel(p: CadrePerson) {
  const parts: string[] = [];
  if (p.strengths) parts.push("نقاط قوة");
  if (p.weaknesses) parts.push("نقاط ضعف");
  if (p.analysis) parts.push("محتاج يتعلم");
  return parts.join(" · ");
}
