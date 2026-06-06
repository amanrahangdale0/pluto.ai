import { motion } from "framer-motion";
import { Check, ArrowRight, Copy, RotateCcw } from "lucide-react";
import ScoreCard from "./ScoreCard";
import SectionBreakdown from "./SectionBreakdown";
import { useToast } from "../shared/Toast";

const KEYWORD_COLORS = ["var(--clr-accent)", "var(--clr-accent-2)", "var(--clr-accent-3)"];

function ListColumn({ title, items = [], icon, accent, fromX }) {
  return (
    <div className="glass rounded-2xl p-6">
      <h4 className="mb-4 font-head text-lg font-bold text-[var(--clr-text)]">{title}</h4>
      <ul className="flex flex-col gap-3">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: fromX }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="flex items-start gap-3 text-sm text-[var(--clr-muted)]"
          >
            <span className="mt-0.5 shrink-0" style={{ color: accent }}>
              {icon}
            </span>
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function buildReport(r) {
  const lines = [
    `RESUMEAI ANALYSIS REPORT`,
    `Overall Score: ${r.overallScore}/100 (Grade ${r.grade})`,
    ``,
    `Summary: ${r.summary}`,
    ``,
    `ATS: ${r.atsScore} | Readability: ${r.readabilityScore} | Impact: ${r.impactScore}`,
    ``,
    `STRENGTHS:`,
    ...(r.strengths || []).map((s) => `• ${s}`),
    ``,
    `IMPROVEMENTS:`,
    ...(r.improvements || []).map((s) => `• ${s}`),
    ``,
    `KEYWORDS: ${(r.keywords || []).join(", ")}`,
  ];
  return lines.join("\n");
}

/**
 * Full analysis results view with staggered reveals.
 * @param {{result: object, onReset: ()=>void}} props
 */
export default function AnalysisResult({ result, onReset }) {
  const toast = useToast();

  async function copyReport() {
    try {
      await navigator.clipboard.writeText(buildReport(result));
      toast("Analysis report copied to clipboard.", "success");
    } catch {
      toast("Couldn't copy to clipboard.", "error");
    }
  }

  const stagger = (i) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: i * 0.1, duration: 0.5 },
  });

  return (
    <div className="flex flex-col gap-6">
      <motion.div {...stagger(0)}>
        <ScoreCard result={result} />
      </motion.div>

      <motion.div {...stagger(1)}>
        <h3 className="mb-4 font-head text-xl font-extrabold text-[var(--clr-text)]">
          Section Breakdown
        </h3>
        <SectionBreakdown sections={result.sections} />
      </motion.div>

      <motion.div {...stagger(2)} className="grid gap-4 md:grid-cols-2">
        <ListColumn
          title="Strengths"
          items={result.strengths}
          icon={<Check size={16} />}
          accent="var(--clr-accent-3)"
          fromX={-24}
        />
        <ListColumn
          title="Improvements"
          items={result.improvements}
          icon={<ArrowRight size={16} />}
          accent="var(--clr-accent)"
          fromX={24}
        />
      </motion.div>

      <motion.div {...stagger(3)} className="glass rounded-2xl p-6">
        <h4 className="mb-4 font-head text-lg font-bold text-[var(--clr-text)]">Keywords</h4>
        <div className="flex flex-wrap gap-2">
          {(result.keywords || []).map((k, i) => {
            const c = KEYWORD_COLORS[i % KEYWORD_COLORS.length];
            return (
              <motion.span
                key={i}
                whileHover={{ scale: 1.05, boxShadow: `0 6px 20px ${c}44` }}
                className="rounded-full px-3 py-1 text-sm font-medium"
                style={{ background: `${c}1f`, color: c, border: `1px solid ${c}55` }}
              >
                {k}
              </motion.span>
            );
          })}
        </div>
      </motion.div>

      <motion.div {...stagger(4)} className="flex flex-wrap justify-center gap-3 pt-2">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={copyReport}
          className="btn-sweep flex items-center gap-2 rounded-full border border-[var(--clr-border)] px-6 py-3 text-sm font-semibold text-[var(--clr-text)] transition-colors hover:text-white"
        >
          <Copy size={16} /> Copy Analysis Report
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onReset}
          className="btn-sweep flex items-center gap-2 rounded-full border border-[var(--clr-border)] px-6 py-3 text-sm font-semibold text-[var(--clr-text)] transition-colors hover:text-white"
        >
          <RotateCcw size={16} /> Analyze Another Resume
        </motion.button>
      </motion.div>
    </div>
  );
}
