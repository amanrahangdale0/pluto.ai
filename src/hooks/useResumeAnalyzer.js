import { useCallback, useState } from "react";
import { extractTextFromFile } from "../utils/extractText";
import { analyzeResume } from "../utils/analyzeResume";

/** Stateful logic for the resume analyzer flow. */
export function useResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const run = useCallback(async (f) => {
    if (!f) return;
    setStatus("loading");
    setError("");
    setResult(null);
    try {
      const text = await extractTextFromFile(f);
      const analysis = await analyzeResume(text);
      setResult(analysis);
      setStatus("done");
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }, []);

  const reset = useCallback(() => {
    setFile(null);
    setResult(null);
    setError("");
    setStatus("idle");
  }, []);

  return { file, setFile, status, result, error, run, reset };
}
