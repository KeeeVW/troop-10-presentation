import { motion } from "framer-motion";
import { openingLines, presentationTitle } from "@/content/presentation";
import { cinematic } from "@/motion/presets";

type Props = {
  onContinue: () => void;
};

export function Opening({ onContinue: _onContinue }: Props) {
  return (
    <motion.section
      className="stage opening"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
      transition={{ duration: 0.7, ease: cinematic.ease }}
      style={{
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <motion.div
        className="atmosphere-orb"
        style={{
          width: "42vw",
          height: "42vw",
          maxWidth: 520,
          maxHeight: 520,
          background: "rgba(61,107,82,0.28)",
          top: "8%",
          left: "12%",
        }}
        animate={{ y: [0, 18, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="atmosphere-orb"
        style={{
          width: "34vw",
          height: "34vw",
          maxWidth: 420,
          maxHeight: 420,
          background: "rgba(106,74,52,0.2)",
          bottom: "6%",
          right: "10%",
        }}
        animate={{ y: [0, -14, 0], x: [0, 12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.55 }}
        transition={{ duration: 1.1, ease: cinematic.ease }}
        style={{
          width: "min(16rem, 36vw)",
          height: 2,
          background: "var(--brown)",
          marginBottom: "2.4rem",
          transformOrigin: "center",
        }}
      />

      <motion.p
        className="en"
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.85, ease: cinematic.ease }}
        style={{
          fontSize: "clamp(1.05rem, 2.1vw, 1.45rem)",
          fontWeight: 500,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "var(--brown)",
          margin: 0,
        }}
      >
        {openingLines.line1}
      </motion.p>

      <motion.h1
        className="ar display-xl"
        initial={{ y: 48, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1.05, ease: cinematic.ease }}
        style={{ fontSize: "clamp(3.4rem, 8.5vw, 6.2rem)", marginTop: "0.9rem" }}
      >
        {openingLines.line2}
      </motion.h1>

      <motion.p
        className="en"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.85, ease: cinematic.ease }}
        style={{
          marginTop: "1.35rem",
          fontSize: "clamp(1.15rem, 2.4vw, 1.75rem)",
          fontWeight: 600,
          letterSpacing: "0.16em",
          color: "var(--ink-soft)",
        }}
      >
        {openingLines.line3}
      </motion.p>

      {presentationTitle ? (
        <motion.p
          className="display-md"
          style={{ marginTop: "1.5rem", color: "var(--ink-soft)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95 }}
        >
          {presentationTitle}
        </motion.p>
      ) : null}
    </motion.section>
  );
}
