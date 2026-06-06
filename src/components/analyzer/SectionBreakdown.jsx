import { motion } from "framer-motion";
import { X } from "lucide-react";
import { scoreColor } from "../../utils/scoreColors";

const LABELS = {
  contact: "Contact",
  summary: "Summary",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
};

const ORDER = ["contact", "summary", "experience", "education", "skills"];

/**
 * Grid of per-section score cards.
 * @param {{sections: object}} props
 */
export default function SectionBreakdown({ sections = {} }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ORDER.filter((k) => sections[k]).map((key, i) => {
        const s = sections[key];
        const score = s.score ?? 0;
        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(124,111,255,0.15)" }}
            className="glass flex flex-col gap-3 rounded-2xl p-5"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-head text-lg font-bold text-[var(--clr-text)]">{LABELS[key]}</h4>
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-bold"
                style={{ background: `${scoreColor(score)}22`, color: scoreColor(score) }}
              >
                {score}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[var(--clr-surface-2)]">
              <motion.div
                className="h-full rounded-full"
                style={{ background: scoreColor(score) }}
                initial={{ width: 0 }}
                whileInView={{ width: `${score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              />
            </div>
            <p className="text-sm leading-relaxed text-[var(--clr-muted)]">{s.feedback}</p>
            {Array.isArray(s.missing) && s.missing.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {s.missing.map((m, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px]"
                    style={{ background: "rgba(255,107,138,0.12)", color: "var(--clr-accent-2)" }}
                  >
                    <X size={11} /> {m}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
