import { motion } from "framer-motion";
import { Check, Lock } from "lucide-react";

const TEMPLATES = [
  {
    id: "modern",
    name: "Modern",
    desc: "Dark sidebar · two columns",
    preview: (
      <div className="flex h-full overflow-hidden rounded-md">
        <div className="w-[34%] bg-[#0f1426] p-2">
          <div className="h-2 w-10 rounded bg-[#00d4aa]" />
          <div className="mt-2 space-y-1">
            {[10, 8, 9].map((w, i) => <div key={i} className="h-1 rounded bg-white/30" style={{ width: `${w * 4}px` }} />)}
          </div>
        </div>
        <div className="flex-1 space-y-1.5 bg-white p-2">
          <div className="h-1.5 w-8 rounded bg-[#00d4aa]" />
          {[14, 12, 13, 10].map((w, i) => <div key={i} className="h-1 rounded bg-[#ddd]" style={{ width: `${w * 5}px` }} />)}
        </div>
      </div>
    ),
  },
  {
    id: "minimal",
    name: "Minimal",
    desc: "Clean white · single column",
    preview: (
      <div className="h-full rounded-md bg-white p-3">
        <div className="mx-auto h-2 w-16 rounded bg-[#333]" />
        <div className="mx-auto mt-1 h-1 w-10 rounded bg-[#bbb]" />
        <div className="my-2 h-px bg-[#eee]" />
        <div className="space-y-1">
          {[16, 14, 15, 12, 13].map((w, i) => <div key={i} className="h-1 rounded bg-[#ddd]" style={{ width: `${w * 5}px` }} />)}
        </div>
      </div>
    ),
  },
  {
    id: "bold",
    name: "Bold",
    desc: "Gradient header · skill bars",
    preview: (
      <div className="h-full overflow-hidden rounded-md bg-white">
        <div className="p-2.5" style={{ background: "linear-gradient(120deg,#7c6fff,#ff6b8a)" }}>
          <div className="h-2.5 w-16 rounded bg-white/90" />
          <div className="mt-1 h-1 w-10 rounded bg-white/60" />
        </div>
        <div className="grid grid-cols-2 gap-1.5 p-2">
          <div className="space-y-1">
            {[12, 10, 11].map((w, i) => <div key={i} className="h-1 rounded bg-[#ddd]" style={{ width: `${w * 4}px` }} />)}
          </div>
          <div className="space-y-1.5">
            {[80, 60, 70].map((w, i) => <div key={i} className="h-1.5 rounded-full" style={{ width: `${w}%`, background: "linear-gradient(90deg,#7c6fff,#ff6b8a)" }} />)}
          </div>
        </div>
      </div>
    ),
  },
];

/**
 * @param {{selected:string, onSelect:(id:string)=>void, locked?:boolean}} props
 */
export default function TemplateSelector({ selected, onSelect, locked = false }) {
  return (
    <div>
      <h3 className="mb-1 font-head text-2xl font-extrabold text-[var(--clr-text)]">Choose Your Style</h3>
      <p className="mb-5 text-sm text-[var(--clr-muted)]">Pick a template — you can change it anytime.</p>

      <div className="-mx-1 flex snap-x gap-4 overflow-x-auto px-1 pb-2 md:grid md:grid-cols-3 md:overflow-visible">
        {TEMPLATES.map((t) => {
          const active = selected === t.id;
          return (
            <motion.button
              key={t.id}
              type="button"
              disabled={locked}
              onClick={() => onSelect(t.id)}
              whileHover={locked ? {} : { scale: 1.03 }}
              className="relative w-[220px] shrink-0 snap-center rounded-2xl border p-3 text-left transition-colors md:w-auto"
              style={{
                borderColor: active ? "var(--clr-accent)" : "var(--clr-border)",
                background: "var(--clr-surface)",
                boxShadow: active ? "0 0 30px rgba(124,111,255,0.3)" : "none",
              }}
            >
              <div className="relative h-36 overflow-hidden rounded-lg bg-[var(--clr-surface-2)] p-2">
                {t.preview}
                {locked && (
                  <div className="absolute inset-0 grid place-items-center rounded-lg bg-black/55 backdrop-blur-[2px]">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <Lock size={18} style={{ color: "var(--clr-muted)" }} />
                      <span className="px-3 text-[11px] text-[var(--clr-muted)]">Complete the form to unlock preview</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="font-head font-bold text-[var(--clr-text)]">{t.name}</p>
                  <p className="text-xs text-[var(--clr-muted)]">{t.desc}</p>
                </div>
                {active && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="grid h-6 w-6 place-items-center rounded-full"
                    style={{ background: "var(--clr-accent)" }}
                  >
                    <Check size={14} className="text-white" />
                  </motion.span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
