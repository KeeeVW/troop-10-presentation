import { motion } from "framer-motion";
import { sections, type SectionId } from "@/content/presentation";
import { cinematic } from "@/motion/presets";

type Props = {
  onSelect: (id: SectionId) => void;
  onContinue: () => void;
};

export function TableOfContents({ onSelect, onContinue }: Props) {
  return (
    <motion.section
      className="stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.55 }}
      style={{ justifyContent: "center" }}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) return;
        onContinue();
      }}
    >
      <div style={{ maxWidth: "54rem", width: "100%", margin: "0 auto" }}>
        <div style={{ display: "grid", gap: "0.15rem" }}>
          {sections.map((s, i) => (
            <motion.button
              key={s.id}
              type="button"
              data-no-advance
              onClick={() => onSelect(s.id)}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12 + i * 0.1, duration: 0.65, ease: cinematic.ease }}
              whileHover={{ x: -10 }}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                alignItems: "center",
                gap: "1.6rem",
                textAlign: "right",
                padding: "1.45rem 0.4rem",
                borderBottom: "1px solid rgba(20,46,38,0.12)",
              }}
            >
              <span
                className="en"
                style={{
                  fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)",
                  fontWeight: 800,
                  color: "var(--green-deep)",
                  lineHeight: 0.9,
                  minWidth: "3.5rem",
                }}
              >
                {s.number}
              </span>
              <span
                className="en"
                style={{
                  fontSize: "clamp(1.35rem, 2.8vw, 2.15rem)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  color: "var(--ink)",
                }}
              >
                {s.title}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
