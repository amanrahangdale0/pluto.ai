import { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";

const ToastContext = createContext(null);
const DURATION = 4000;

const VARIANTS = {
  error: { color: "var(--clr-accent-2)", Icon: XCircle },
  success: { color: "var(--clr-accent-3)", Icon: CheckCircle2 },
  warning: { color: "var(--clr-amber)", Icon: AlertTriangle },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const toast = useCallback(
    (message, variant = "error") => {
      const id = Math.random().toString(36).slice(2);
      setToasts((t) => [...t, { id, message, variant }]);
      setTimeout(() => dismiss(id), DURATION);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="pointer-events-none fixed bottom-5 right-5 z-[100] flex w-[min(360px,90vw)] flex-col gap-3">
        <AnimatePresence>
          {toasts.map(({ id, message, variant }) => {
            const { color, Icon } = VARIANTS[variant] || VARIANTS.error;
            return (
              <motion.div
                key={id}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
                className="glass-strong pointer-events-auto relative flex items-start gap-3 overflow-hidden rounded-xl p-4 pr-10"
                style={{ borderColor: color }}
              >
                <Icon size={20} style={{ color }} className="mt-0.5 shrink-0" />
                <p className="text-sm text-[var(--clr-text)]">{message}</p>
                <button
                  onClick={() => dismiss(id)}
                  className="absolute right-3 top-3 text-[var(--clr-muted)] transition-colors hover:text-[var(--clr-text)]"
                  aria-label="Dismiss"
                >
                  <X size={16} />
                </button>
                <motion.span
                  className="absolute bottom-0 left-0 h-[3px]"
                  style={{ background: color }}
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: DURATION / 1000, ease: "linear" }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  return ctx || (() => {});
}
