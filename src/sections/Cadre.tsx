import { AnimatePresence, motion } from "framer-motion";
import { InteractivePanel } from "@/components/InteractivePanel";
import { MixedText } from "@/components/MixedText";
import { cadre, type CadrePerson } from "@/content/presentation";
import { cinematic, zoomIn, zoomOut } from "@/motion/presets";

type Props = {
  step: number;
};

/** 0 team overview · 1-4 each person */
export const CADRE_STEPS = 5;

export function Cadre({ step }: Props) {
  return (
    <motion.section className="stage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div style={{ maxWidth: "74rem", width: "100%", margin: "0 auto", flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "0.75rem", flexShrink: 0 }}>
          <p className="eyebrow">4 — CADRE ANALYSIS</p>
          <h2 className="en" style={{ fontFamily: "var(--font-en)", fontSize: "clamp(1.7rem, 3.2vw, 2.4rem)", fontWeight: 700, color: "var(--green-deep)", margin: 0 }}>
            CADRE ANALYSIS
          </h2>
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
        gap: "1rem",
        alignContent: "center",
      }}
    >
      {cadre.map((p, i) => (
        <InteractivePanel
          key={p.id}
          delay={0.1 * i}
          glow={["rgba(42,82,64,0.22)", "rgba(106,74,52,0.2)", "rgba(85,102,58,0.2)", "rgba(63,44,32,0.18)"][i]}
          style={{
            minHeight: "11rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "1.35rem",
            borderTop: `3px solid ${tone(i)}`,
          }}
        >
          <span className="en" style={{ fontSize: "clamp(1.55rem, 2.4vw, 2.15rem)", fontWeight: 800, color: "var(--green-deep)" }}>
            {p.name}
          </span>
          <span className="ar muted" style={{ marginTop: "0.55rem", fontSize: "0.85rem" }}>
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
      <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "0.85rem", flexShrink: 0 }}>
        <h3 className="en" style={{ fontFamily: "var(--font-en)", fontSize: "clamp(1.7rem, 3vw, 2.4rem)", fontWeight: 700, color: "var(--green-deep)", margin: 0 }}>
          {person.name}
        </h3>
        <span className="en muted" style={{ letterSpacing: "0.12em", fontSize: "0.75rem" }}>
          {index + 1} / 4
        </span>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: analysisOnly ? "1fr" : "1fr 1fr",
          gap: "0.75rem",
          overflow: "hidden",
        }}
      >
        {person.strengths && (
          <ListBlock title="المميزات" tone="var(--strength)" items={person.strengths} extra={person.technicalSkills} />
        )}
        {person.weaknesses && <ListBlock title="العيوب" tone="var(--weakness)" items={person.weaknesses} />}
        {person.analysis && (
          <ListBlock
            title="التحليل"
            tone="var(--brown)"
            items={person.analysis}
            wide={analysisOnly}
            dense={dense || analysisOnly}
          />
        )}
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
  if (p.strengths) parts.push("مميزات");
  if (p.weaknesses) parts.push("عيوب");
  if (p.analysis) parts.push("تحليل");
  return parts.join(" · ");
}
