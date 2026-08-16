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
        position: "relative",
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
          background: "rgba(138,154,91,0.18)",
          top: "8%",
          left: "12%",
        }}
        animate={{ y: [0, 22, 0], x: [0, -12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="atmosphere-orb"
        style={{
          width: "34vw",
          height: "34vw",
          maxWidth: 420,
          maxHeight: 420,
          background: "rgba(125,97,71,0.14)",
          bottom: "6%",
          right: "10%",
        }}
        animate={{ y: [0, -18, 0], x: [0, 14, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.6 }}
        transition={{ duration: 1.2, ease: cinematic.ease }}
        style={{
          width: "min(16rem, 36vw)",
          height: 2.5,
          background: "var(--brown)",
          marginBottom: "2.8rem",
          transformOrigin: "center",
        }}
      />

      <motion.p
        className="en"
        initial={{ y: 32, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.95, ease: cinematic.ease }}
        style={{
          fontSize: "clamp(1.1rem, 2.2vw, 1.55rem)",
          fontWeight: 500,
          letterSpacing: "0.38em",
          textTransform: "uppercase",
          color: "var(--brown)",
          margin: 0,
        }}
      >
        {openingLines.line1}
      </motion.p>

      <motion.h1
        className="ar display-xl"
        initial={{ y: 56, opacity: 0, scale: 0.92 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 1.15, ease: cinematic.ease }}
        style={{ fontSize: "clamp(3.6rem, 8.8vw, 6.6rem)", marginTop: "1.1rem" }}
      >
        {openingLines.line2}
      </motion.h1>

      <motion.p
        className="en"
        initial={{ y: 28, opacity: 0, scale: 0.99 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.65, duration: 0.95, ease: cinematic.ease }}
        style={{
          marginTop: "1.5rem",
          fontSize: "clamp(1.2rem, 2.5vw, 1.9rem)",
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
