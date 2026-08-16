import { motion } from "framer-motion";
import { closingLines, troopName } from "@/content/presentation";
import { cinematic } from "@/motion/presets";

type Props = {
  onRestart?: () => void;
};

export function Closing({ onRestart: _onRestart }: Props) {
  return (
    <motion.section
      className="stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ justifyContent: "center", alignItems: "center", textAlign: "center", overflow: "hidden" }}
    >
      <motion.div
        className="atmosphere-orb"
        style={{
          width: "50vw",
          height: "50vw",
          maxWidth: 560,
          maxHeight: 560,
          background: "rgba(61,107,82,0.22)",
          top: "20%",
          left: "25%",
        }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: cinematic.ease }}
        style={{ width: "5rem", height: 2, background: "var(--brown)", marginBottom: "2rem", opacity: 0.6 }}
      />

      <motion.h2
        className="ar display-xl"
        style={{ fontSize: "clamp(2.4rem, 5.5vw, 4rem)" }}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.85, ease: cinematic.ease }}
      >
        {troopName}
      </motion.h2>

      <motion.p
        className="en"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        style={{
          marginTop: "2.4rem",
          fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
          fontWeight: 600,
          color: "var(--ink-soft)",
          letterSpacing: "0.04em",
        }}
      >
        {closingLines.questions}
      </motion.p>

      <motion.p
        className="en"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        style={{
          marginTop: "1.1rem",
          fontSize: "clamp(1rem, 2vw, 1.35rem)",
          fontWeight: 500,
          color: "var(--muted)",
          letterSpacing: "0.06em",
        }}
      >
        {closingLines.thanks}
      </motion.p>
    </motion.section>
  );
}
