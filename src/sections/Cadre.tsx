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
        <div style={{ marginBottom: "1.15rem" }}>
          <p className="eyebrow">4 — CADRE ANALYSIS</p>
          <h2 className="en display-lg" style={{ fontFamily: "var(--font-en)" }}>
            CADRE ANALYSIS
          </h2>
        </div>

        <div className="scroll-area">
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
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1rem",
        minHeight: "60%",
        alignContent: "center",
      }}
    >
      {cadre.map((p, i) => (
        <InteractivePanel
          key={p.id}
          delay={0.1 * i}
          glow={["rgba(42,82,64,0.22)", "rgba(106,74,52,0.2)", "rgba(85,102,58,0.2)", "rgba(63,44,32,0.18)"][i]}
          style={{
            minHeight: "12rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "1.5rem",
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
  return (
    <motion.div {...zoomIn} transition={cinematic}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "1.5rem" }}>
        <h3 className="en display-lg" style={{ fontFamily: "var(--font-en)" }}>
          {person.name}
        </h3>
        <span className="en muted" style={{ letterSpacing: "0.12em", fontSize: "0.75rem" }}>
          {index + 1} / 4
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: person.analysis && !person.strengths ? "1fr" : "1fr 1fr",
          gap: "1rem",
        }}
      >
        {person.strengths && (
          <ListBlock title="المميزات" tone="var(--strength)" items={person.strengths} extra={person.technicalSkills} />
        )}
        {person.weaknesses && <ListBlock title="العيوب" tone="var(--weakness)" items={person.weaknesses} />}
        {person.analysis && (
          <ListBlock title="التحليل" tone="var(--brown)" items={person.analysis} wide={!person.strengths} />
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
}: {
  title: string;
  tone: string;
  items: string[];
  extra?: string[];
  wide?: boolean;
}) {
  return (
    <InteractivePanel
      glow={tone}
      style={{ borderTop: `3px solid ${tone}`, gridColumn: wide ? "1 / -1" : undefined }}
    >
      <p className="ar" style={{ fontWeight: 700, marginBottom: "0.85rem", color: tone }}>
        {title}
      </p>
      <ul style={{ margin: 0, padding: "0 1.1rem 0 0", display: "grid", gap: "0.55rem" }}>
        {items.map((item, i) => (
          <motion.li
            key={item}
            className="body-md"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.06 * i }}
          >
            <MixedText text={item} />
            {item === "شاطر في فنيات" && extra && (
              <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", marginTop: "0.45rem" }}>
                {extra.map((e) => (
                  <span key={e} className="tag ar">
                    {e}
                  </span>
                ))}
              </div>
            )}
          </motion.li>
        ))}
      </ul>
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
