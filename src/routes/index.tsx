import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const App = lazy(() => import("../App.jsx"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ResumeAI — AI Resume Analyzer & Builder" },
      { name: "description", content: "AI-powered resume analysis and professional templates. Upload, analyze, and build a standout resume in minutes." },
      { property: "og:title", content: "ResumeAI — AI Resume Analyzer & Builder" },
      { property: "og:description", content: "AI-powered resume analysis and professional templates. Upload, analyze, and build a standout resume in minutes." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--clr-bg)]" />}>
      <App />
    </Suspense>
  );
}
