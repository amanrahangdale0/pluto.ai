import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

/**
 * Tag/pill input. Adds on Enter or comma; removable chips.
 * @param {{label:string, tags:string[], onChange:(t:string[])=>void, placeholder?:string}} props
 */
export default function TagInput({ label, tags, onChange, placeholder = "Type and press Enter" }) {
  const [draft, setDraft] = useState("");

  function commit(raw) {
    const value = raw.trim().replace(/,$/, "").trim();
    if (value && !tags.includes(value)) onChange([...tags, value]);
    setDraft("");
  }

  function handleKey(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commit(draft);
    } else if (e.key === "Backspace" && !draft && tags.length) {
      onChange(tags.slice(0, -1));
    }
  }

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[var(--clr-muted)]">{label}</label>
      <div className="flex min-h-[52px] flex-wrap items-center gap-2 rounded-xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-2.5 focus-within:border-[var(--clr-accent)] focus-within:shadow-[0_0_0_3px_rgba(124,111,255,0.18)]">
        <AnimatePresence>
          {tags.map((tag) => (
            <motion.span
              key={tag}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center gap-1 rounded-full px-3 py-1 text-sm"
              style={{ background: "rgba(124,111,255,0.16)", color: "var(--clr-accent)" }}
            >
              {tag}
              <button onClick={() => onChange(tags.filter((t) => t !== tag))} className="opacity-70 hover:opacity-100">
                <X size={13} />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKey}
          onBlur={() => draft && commit(draft)}
          placeholder={tags.length ? "" : placeholder}
          className="min-w-[120px] flex-1 bg-transparent text-sm text-[var(--clr-text)] outline-none placeholder:text-[var(--clr-muted)]"
        />
      </div>
    </div>
  );
}
