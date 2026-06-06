import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { scoreColor, gradeColor } from "../../utils/scoreColors";

const RADIUS = 80;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function MiniBar({ label, value }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-[var(--clr-muted)]">{label}</span>
        <span className="font-semibold text-[var(--clr-text)]">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[var(--clr-surface-2)]">
        <motion.div
          className="h-full rounded-full"
          style={{ background: scoreColor(value) }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.3 }}
        />
      </div>
    </div>
  );
}

/**
 * Hero score card with animated ring + counting number.
 * @param {{result: object}} props
 */
export default function ScoreCard({ result }) {
  const { overallScore = 0, grade = "C", summary = "", atsScore = 0, readabilityScore = 0, impactScore = 0 } = result;
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(count, overallScore, { duration: 1.5, ease: "easeOut" });
    return controls.stop;
  }, [count, overallScore]);

  return (
    <div className="glass grid gap-8 rounded-3xl p-8 md:grid-cols-[auto_1fr] md:items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-[200px] w-[200px]">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r={RADIUS} fill="none" stroke="var(--clr-surface-2)" strokeWidth="14" />
            <motion.circle
              cx="100"
              cy="100"
              r={RADIUS}
              fill="none"
              stroke={scoreColor(overallScore)}
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              initial={{ strokeDashoffset: CIRCUMFERENCE }}
              animate={{ strokeDashoffset: CIRCUMFERENCE - (overallScore / 100) * CIRCUMFERENCE }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span className="font-head text-5xl font-extrabold text-[var(--clr-text)]">
              {rounded}
            </motion.span>
            <span className="text-xs uppercase tracking-widest text-[var(--clr-muted)]">/ 100</span>
          </div>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.6 }}
          className="rounded-full px-5 py-1.5 font-head text-lg font-extrabold"
          style={{ background: `${gradeColor(grade)}22`, color: gradeColor(grade) }}
        >
          Grade {grade}
        </motion.div>
      </div>

      <div className="flex flex-col gap-5">
        <h3 className="font-head text-2xl font-extrabold text-[var(--clr-text)]">Overall Assessment</h3>
        <p className="text-[var(--clr-muted)]">{summary}</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <MiniBar label="ATS Score" value={atsScore} />
          <MiniBar label="Readability" value={readabilityScore} />
          <MiniBar label="Impact" value={impactScore} />
        </div>
      </div>
    </div>
  );
}
