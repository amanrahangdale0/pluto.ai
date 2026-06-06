import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHASES = [
  "Checking ATS compatibility...",
  "Scoring sections...",
  "Finding improvements...",
  "Polishing the verdict...",
];

const TITLE = "Analyzing your resume";

/** Full-overlay animated loading orb with typing + rotating status text. */
export default function LoadingOrb() {
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(TITLE.slice(0, i));
      if (i >= TITLE.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % PHASES.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-20 text-center">
      <div className="relative h-40 w-40">
        {[0, 1, 2].map((r) => (
          <span
            key={r}
            className="orb-ring absolute inset-0 rounded-full border"
            style={{
              borderColor: "rgba(124,111,255,0.5)",
              animationDelay: `${r * 0.6}s`,
            }}
          />
        ))}
        <div className="orb-core absolute inset-[34%] rounded-full blur-[2px]" />
        <div className="absolute inset-[40%] rounded-full bg-[var(--clr-bg)]" />
      </div>

      <div>
        <h3 className="font-head text-2xl font-extrabold text-[var(--clr-text)]">
          {typed}
          <span className="animate-pulse">_</span>
        </h3>
        <div className="mt-3 h-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={phase}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-[var(--clr-muted)]"
            >
              {PHASES[phase]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
