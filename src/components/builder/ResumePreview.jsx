import { useState } from "react";
import { motion } from "framer-motion";
import { Download, RotateCcw } from "lucide-react";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import BoldTemplate from "./templates/BoldTemplate";

const TEMPLATES = {
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  bold: BoldTemplate,
};

/**
 * @param {{template:string, data:object, onReset:()=>void}} props
 */
export default function ResumePreview({ template, data, onReset }) {
  const [downloading, setDownloading] = useState(false);
  const Template = TEMPLATES[template] || ModernTemplate;

  function download() {
    setDownloading(true);
    setTimeout(() => {
      window.print();
      setDownloading(false);
    }, 400);
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={download}
          className="shimmer-bg flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(124,111,255,0.35)]"
        >
          <motion.span animate={downloading ? { y: [0, 4, 0] } : {}} transition={{ repeat: Infinity, duration: 0.6 }}>
            <Download size={16} />
          </motion.span>
          {downloading ? "Preparing…" : "Download PDF"}
        </motion.button>
        <button
          onClick={onReset}
          className="flex items-center gap-2 rounded-full border border-[var(--clr-border)] px-6 py-3 text-sm font-semibold text-[var(--clr-text)] transition-colors hover:border-[var(--clr-accent)]"
        >
          <RotateCcw size={16} /> Edit & Regenerate
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="w-full max-w-[820px] overflow-hidden rounded-xl shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
      >
        <div
          id="resume-print"
          className="mx-auto bg-white"
          style={{ width: "100%", aspectRatio: "1 / 1.294", minHeight: "1000px" }}
        >
          <Template data={data} />
        </div>
      </motion.div>

      <p className="text-center text-xs text-[var(--clr-muted)] md:hidden">
        Tip: best viewed and downloaded on desktop.
      </p>
    </div>
  );
}
