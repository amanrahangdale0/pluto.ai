import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { Sparkles, ScanLine, PenLine } from "lucide-react";
import { ToastProvider } from "./components/shared/Toast";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import UploadZone from "./components/analyzer/UploadZone";
import AnalysisResult from "./components/analyzer/AnalysisResult";
import BuilderForm from "./components/builder/BuilderForm";
import ResumePreview from "./components/builder/ResumePreview";
import LoadingOrb from "./components/shared/LoadingOrb";
import { useResumeAnalyzer } from "./hooks/useResumeAnalyzer";
import { useResumeBuilder } from "./hooks/useResumeBuilder";

const HERO_WORDS = ["Your", "Resume,", "Reinvented."];
const FLOAT_CARDS = [
  { text: "Score: 87 ✓", depth: 0.02, pos: "left-[6%] top-[26%]", color: "var(--clr-accent-3)" },
  { text: "ATS Ready ✓", depth: 0.04, pos: "right-[8%] top-[34%]", color: "var(--clr-accent)" },
  { text: "12 Improvements", depth: 0.03, pos: "left-[14%] bottom-[16%]", color: "var(--clr-accent-2)" },
];

function Hero({ onCta }) {
  const mx = useSpring(0, { stiffness: 100, damping: 30 });
  const my = useSpring(0, { stiffness: 100, damping: 30 });

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  }

  return (
    <section onMouseMove={onMove} className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 pt-24">
      <div className="blob -left-20 top-0 h-80 w-80 bg-[var(--clr-accent)]" style={{ animation: "blobFloat 8s ease-in-out infinite" }} />
      <div className="blob right-0 top-10 h-72 w-72 bg-[var(--clr-accent-2)]" style={{ animation: "blobFloat 12s ease-in-out infinite 2s" }} />
      <div className="blob bottom-0 left-1/3 h-72 w-72 bg-[var(--clr-accent-3)]" style={{ animation: "blobFloat 10s ease-in-out infinite 4s" }} />
      <div className="blob -right-10 bottom-10 h-64 w-64 bg-[var(--clr-accent)]" style={{ animation: "blobFloat 14s ease-in-out infinite 6s" }} />
      <div className="grid-overlay pointer-events-none absolute inset-0" />

      {FLOAT_CARDS.map((c, i) => (
        <motion.div
          key={i}
          className={`glass pointer-events-none absolute hidden rounded-xl px-4 py-2 text-sm font-semibold md:block ${c.pos}`}
          style={{ color: c.color, x: mx, y: my }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
        >
          {c.text}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-2xl text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--clr-border)] bg-[var(--clr-surface)] px-4 py-1.5 text-xs font-medium text-[var(--clr-muted)]">
          <span className="pulse-dot h-2 w-2 rounded-full bg-[var(--clr-accent-3)]" /> Powered by Claude AI
        </motion.div>
        <h1 className="font-head text-5xl font-extrabold leading-[1.05] md:text-7xl">
          {HERO_WORDS.map((w, i) => (
            <motion.span key={i} className={i === 2 ? "text-gradient inline-block" : "inline-block"}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}>
              {w}{i < HERO_WORDS.length - 1 ? "\u00A0" : ""}
            </motion.span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mx-auto mt-5 max-w-lg text-[var(--clr-muted)]">
          AI-powered analysis & professional templates. Upload, analyze, and build — in minutes.
        </motion.p>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="mt-8 flex flex-wrap justify-center gap-3">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => onCta("analyze")}
            className="btn-sweep flex items-center gap-2 rounded-full border border-[var(--clr-border)] px-6 py-3 text-sm font-semibold text-[var(--clr-text)] transition-colors hover:text-white">
            <ScanLine size={16} /> Analyze My Resume
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => onCta("build")}
            className="shimmer-bg flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white">
            <PenLine size={16} /> Build From Scratch
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}


function GhostResults() {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      {["Your analysis will appear here", "Section scores", "AI improvements"].map((t, i) => (
        <div key={i} className="skeleton h-32 rounded-2xl p-4">
          <p className="text-xs text-[var(--clr-muted)]">{t}</p>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("analyze");
  const toolRef = useRef(null);
  const analyzer = useResumeAnalyzer();
  const builder = useResumeBuilder();

  function goTo(t) {
    setTab(t);
    toolRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <ToastProvider>
      <Navbar tab={tab} onTab={setTab} />
      <Hero onCta={goTo} />

      <section ref={toolRef} className="scanlines mx-auto max-w-6xl px-4 py-16">

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
            {tab === "analyze" ? (
              <div>
                {analyzer.status === "loading" ? (
                  <LoadingOrb />
                ) : analyzer.status === "done" && analyzer.result ? (
                  <AnalysisResult result={analyzer.result} onReset={analyzer.reset} />
                ) : (
                  <div>
                    <UploadZone file={analyzer.file} onSelect={(f) => analyzer.setFile(f)} onAnalyze={() => analyzer.run(analyzer.file)} />
                    {analyzer.status === "error" && (
                      <div className="glass mt-4 rounded-2xl border-[var(--clr-accent-2)] p-5 text-center">
                        <p className="text-sm text-[var(--clr-text)]">{analyzer.error}</p>
                        <button onClick={() => analyzer.file && analyzer.run(analyzer.file)} className="mt-3 rounded-full bg-[var(--clr-accent)] px-5 py-2 text-sm font-semibold text-white">Retry</button>
                      </div>
                    )}
                    {analyzer.status === "idle" && <GhostResults />}
                  </div>
                )}
              </div>
            ) : (
              <div>
                {builder.status === "loading" ? (
                  <LoadingOrb />
                ) : builder.status === "done" ? (
                  <ResumePreview template={builder.template} data={builder.resume} onReset={builder.reset} />
                ) : (
                  <div>
                    <BuilderForm b={builder} />
                    {builder.status === "error" && (
                      <p className="mt-4 text-center text-sm text-[var(--clr-accent-2)]">{builder.error}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      <Footer />
    </ToastProvider>
  );
}
