import { AnimatePresence, motion } from "framer-motion";
import { InteractivePanel } from "@/components/InteractivePanel";
import { MixedText } from "@/components/MixedText";
import { visionScout, visionTroop } from "@/content/presentation";
import { cinematic, zoomIn, zoomOut } from "@/motion/presets";

type Props = {
  step: number;
};

/**
 * 0 chapter
 * 1 troop outline · 2 troop open · 3-8 troop pillars
 * 9 bridge · 10 scout outline · 11 scout open · 12-23 scout pillars
 */
export const VISION_STEPS = 24;

const TROOP_PILLAR_START = 3;
const SCOUT_BRIDGE = 9;
const SCOUT_OUTLINE = 10;
const SCOUT_OPEN = 11;
const SCOUT_PILLAR_START = 12;

export function Vision({ step }: Props) {
  return (
    <motion.section className="stage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div style={{ maxWidth: "74rem", width: "100%", margin: "0 auto", flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "0.9rem" }}>
          <p className="eyebrow">2 — VISION</p>
        </div>

        <div style={{ flex: 1, position: "relative", minHeight: 0, overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            {step === 0 && <ChapterIntro key="intro" />}
            {step === 1 && (
              <OutlineView key="t-out" title="Vision for the Troop" pillars={visionTroop.pillars.map((p) => p.title)} />
            )}
            {step === 2 && (
              <OpeningBeats key="t-open" title="Vision for the Troop" beats={[...visionTroop.openingBeats]} framing={visionTroop.framing} />
            )}
            {step >= TROOP_PILLAR_START && step < SCOUT_BRIDGE && (
              <ZoomDetail
                key={`tp-${step}`}
                index={step - TROOP_PILLAR_START}
                total={visionTroop.pillars.length}
                title={visionTroop.pillars[step - TROOP_PILLAR_START].title}
                paragraphs={[...visionTroop.pillars[step - TROOP_PILLAR_START].detail]}
                outline={visionTroop.pillars.map((p) => p.title)}
              />
            )}
            {step === SCOUT_BRIDGE && <VisionBridge key="bridge" />}
            {step === SCOUT_OUTLINE && (
              <OutlineView key="s-out" title="Vision for the Scout" pillars={visionScout.pillars.map((p) => p.title)} dense />
            )}
            {step === SCOUT_OPEN && <OpeningBeats key="s-open" title="Vision for the Scout" beats={[...visionScout.openingBeats]} />}
            {step >= SCOUT_PILLAR_START && (
              <ZoomDetail
                key={`sp-${step}`}
                index={step - SCOUT_PILLAR_START}
                total={visionScout.pillars.length}
                title={visionScout.pillars[step - SCOUT_PILLAR_START].title}
                paragraphs={[...visionScout.pillars[step - SCOUT_PILLAR_START].detail]}
                outline={visionScout.pillars.map((p) => p.title)}
                dense
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

function ChapterIntro() {
  return (
    <motion.div
      {...zoomOut}
      transition={cinematic}
      style={{ height: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", alignItems: "center" }}
    >
      <InteractivePanel
        delay={0.1}
        glow="rgba(42,82,64,0.22)"
        style={{ padding: "2.6rem 2rem", minHeight: "15rem", borderTop: "3px solid var(--green-mid)", display: "flex", alignItems: "flex-end" }}
      >
        <h3 className="en display-md" style={{ fontFamily: "var(--font-en)" }}>
          Vision for the Troop
        </h3>
      </InteractivePanel>
      <InteractivePanel
        delay={0.22}
        glow="rgba(106,74,52,0.2)"
        style={{ padding: "2.6rem 2rem", minHeight: "15rem", borderTop: "3px solid var(--brown)", display: "flex", alignItems: "flex-end" }}
      >
        <h3 className="en display-md" style={{ fontFamily: "var(--font-en)" }}>
          Vision for the Scout
        </h3>
      </InteractivePanel>
    </motion.div>
  );
}

function VisionBridge() {
  return (
    <motion.div
      {...zoomIn}
      transition={cinematic}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: "1.2rem",
      }}
    >
      <p className="en display-md" style={{ color: "var(--muted)", fontFamily: "var(--font-en)", letterSpacing: "0.08em" }}>
        Vision for the Troop
      </p>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        style={{ width: 2, height: "3.2rem", background: "var(--brown)", opacity: 0.55, transformOrigin: "top" }}
      />
      <h3 className="en display-xl" style={{ fontSize: "clamp(1.8rem, 4vw, 2.9rem)", fontFamily: "var(--font-en)" }}>
        Vision for the Scout
      </h3>
    </motion.div>
  );
}

function OpeningBeats({ title, beats, framing }: { title: string; beats: string[]; framing?: string }) {
  return (
    <motion.div {...zoomOut} transition={cinematic} className="scroll-area">
      <p className="en eyebrow">{title}</p>
      {framing ? <MixedText text={framing} as="p" className="body-md muted" style={{ marginBottom: "1.4rem" }} /> : null}
      <div style={{ display: "grid", gap: "0.9rem" }}>
        {beats.map((b, i) => (
          <InteractivePanel
            key={b}
            delay={0.1 * i}
            glow="rgba(42,82,64,0.16)"
            style={{ borderRight: "4px solid var(--green-mid)" }}
          >
            <MixedText text={b} as="p" className="body-lg" />
          </InteractivePanel>
        ))}
      </div>
    </motion.div>
  );
}

function OutlineView({ title, pillars, dense }: { title: string; pillars: string[]; dense?: boolean }) {
  return (
    <motion.div {...zoomOut} transition={cinematic} className="scroll-area">
      <h3 className="en display-md" style={{ marginBottom: "1.2rem", fontFamily: "var(--font-en)" }}>
        {title}
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: dense ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
          gap: dense ? "0.6rem" : "0.85rem",
        }}
      >
        {pillars.map((p, i) => (
          <InteractivePanel
            key={p}
            delay={0.04 * i}
            style={{
              padding: dense ? "0.8rem 0.95rem" : "1.05rem 1.2rem",
              display: "flex",
              gap: "0.75rem",
              alignItems: "baseline",
            }}
          >
            <span className="en" style={{ fontWeight: 700, color: "var(--green-deep)", opacity: 0.4, fontSize: "0.9rem" }}>
              {i + 1}
            </span>
            <span className="ar" style={{ fontSize: dense ? "0.95rem" : "1.1rem", fontWeight: 600 }}>
              {p}
            </span>
          </InteractivePanel>
        ))}
      </div>
    </motion.div>
  );
}

function ZoomDetail({
  index,
  total,
  title,
  paragraphs,
  outline,
  dense,
}: {
  index: number;
  total: number;
  title: string;
  paragraphs: string[];
  outline: string[];
  dense?: boolean;
}) {
  return (
    <motion.div
      {...zoomIn}
      transition={{ duration: 0.5, ease: cinematic.ease }}
      style={{
        height: "100%",
        display: "grid",
        gridTemplateColumns: dense ? "9.5rem 1fr" : "12rem 1fr",
        gap: "1.2rem",
      }}
    >
      <div style={{ overflow: "auto", paddingLeft: "0.25rem", borderLeft: "1px solid rgba(20,46,38,0.1)" }}>
        {outline.map((o, i) => (
          <motion.div
            key={o}
            layout
            className="ar"
            animate={{ opacity: i === index ? 1 : 0.28, fontWeight: i === index ? 700 : 400 }}
            style={{
              padding: "0.45rem 0.35rem",
              fontSize: "0.72rem",
              color: "var(--green-deep)",
              borderRight: i === index ? "2px solid var(--brown)" : "2px solid transparent",
            }}
          >
            {o}
          </motion.div>
        ))}
      </div>

      <div className="scroll-area">
        <p className="en muted" style={{ fontSize: "0.75rem", letterSpacing: "0.12em" }}>
          {index + 1} / {total}
        </p>
        <h3 className="ar display-lg" style={{ margin: "0.5rem 0 1.2rem", fontSize: "clamp(1.55rem, 3vw, 2.35rem)" }}>
          {title}
        </h3>
        <div style={{ display: "grid", gap: "1rem" }}>
          {paragraphs.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
              <MixedText text={p} as="p" className="body-lg" style={{ maxWidth: "48rem" }} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
