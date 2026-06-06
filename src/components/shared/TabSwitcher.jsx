import { motion } from "framer-motion";

/**
 * Pill tab switcher with animated indicator.
 * @param {{tabs: {id:string,label:string,icon?:React.ReactNode}[], active:string, onChange:(id:string)=>void, layoutId?:string}} props
 */
export default function TabSwitcher({ tabs, active, onChange, layoutId = "tab-indicator" }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-[var(--clr-border)] bg-[var(--clr-surface)] p-1.5">
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="relative rounded-full px-5 py-2 text-sm font-medium transition-colors"
            style={{ color: isActive ? "var(--clr-text)" : "var(--clr-muted)" }}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(120deg, rgba(124,111,255,0.9), rgba(255,107,138,0.9))",
                }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
