import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Check, FileText, FileType2, Sparkles } from "lucide-react";
import { useToast } from "../shared/Toast";
import {
  MAX_FILE_SIZE,
  ACCEPTED_TYPES,
  getFileKind,
} from "../../utils/extractText";

/**
 * Drag-and-drop upload zone.
 * @param {{file: File|null, onSelect:(f:File|null)=>void, onAnalyze:()=>void}} props
 */
export default function UploadZone({ file, onSelect, onAnalyze }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);
  const toast = useToast();

  function validate(f) {
    const kind = getFileKind(f);
    if (!["pdf", "docx", "doc"].includes(kind)) {
      toast("Unsupported file type — upload a PDF or Word document.", "error");
      return false;
    }
    if (f.size > MAX_FILE_SIZE) {
      toast("File too large — please keep it under 5MB.", "error");
      return false;
    }
    return true;
  }

  function handleFiles(files) {
    const f = files?.[0];
    if (!f) return;
    if (validate(f)) {
      onSelect(f);
      toast(`${f.name} ready to analyze.`, "success");
    }
  }

  const kind = file ? getFileKind(file) : null;
  const isPdf = kind === "pdf";

  return (
    <div className="w-full">
      <motion.div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => !file && inputRef.current?.click()}
        animate={{
          borderColor: dragging ? "var(--clr-accent)" : "var(--clr-border)",
          backgroundColor: dragging ? "rgba(124,111,255,0.08)" : "rgba(17,17,24,0.5)",
          boxShadow: dragging ? "0 0 40px rgba(124,111,255,0.25)" : "0 0 0 rgba(0,0,0,0)",
        }}
        className="relative flex min-h-[400px] cursor-pointer flex-col items-center justify-center gap-5 rounded-3xl border-2 border-dashed px-6 text-center"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-5"
            >
              <motion.div
                animate={
                  dragging
                    ? { rotate: 360, scale: 1.1 }
                    : { y: [0, -6, 0] }
                }
                transition={
                  dragging
                    ? { duration: 0.6 }
                    : { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }
                className="grid h-20 w-20 place-items-center rounded-2xl"
                style={{ background: "linear-gradient(135deg, rgba(124,111,255,0.2), rgba(255,107,138,0.2))" }}
              >
                <UploadCloud size={36} style={{ color: "var(--clr-accent)" }} />
              </motion.div>
              <div>
                <p className="font-head text-xl font-bold text-[var(--clr-text)]">
                  Drop your resume here
                </p>
                <p className="mt-1 text-sm text-[var(--clr-muted)]">
                  PDF or Word document · Max 5MB
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  inputRef.current?.click();
                }}
                className="story-link text-sm font-medium text-[var(--clr-accent)]"
              >
                Or browse files
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="filled"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="grid h-20 w-20 place-items-center rounded-2xl"
                style={{ background: "rgba(0,212,170,0.15)" }}
              >
                <Check size={40} style={{ color: "var(--clr-accent-3)" }} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 rounded-full border border-[var(--clr-border)] bg-[var(--clr-surface-2)] px-4 py-2"
              >
                {isPdf ? (
                  <FileType2 size={18} style={{ color: "var(--clr-accent-2)" }} />
                ) : (
                  <FileText size={18} style={{ color: "var(--clr-accent)" }} />
                )}
                <span className="max-w-[200px] truncate text-sm font-medium text-[var(--clr-text)]">
                  {file.name}
                </span>
                <span className="text-xs text-[var(--clr-muted)]">
                  {(file.size / 1024).toFixed(0)} KB
                </span>
              </motion.div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAnalyze();
                  }}
                  className="shimmer-bg flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(124,111,255,0.35)]"
                >
                  <Sparkles size={16} /> Analyze Now
                </motion.button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(null);
                  }}
                  className="rounded-full px-4 py-3 text-sm text-[var(--clr-muted)] transition-colors hover:text-[var(--clr-text)]"
                >
                  Choose another
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
