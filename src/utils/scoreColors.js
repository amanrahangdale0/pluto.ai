/** Map a 0-100 score (or letter grade) to a palette color. */

export function scoreColor(score) {
  if (score >= 85) return "var(--clr-accent-3)"; // mint teal
  if (score >= 70) return "var(--clr-accent)"; // violet
  if (score >= 55) return "var(--clr-amber)"; // amber
  return "var(--clr-accent-2)"; // coral
}

export function gradeColor(grade) {
  const g = (grade || "").toUpperCase();
  if (g === "A+") return "var(--clr-accent-3)";
  if (g === "A" || g === "B+") return "var(--clr-accent)";
  if (g === "B" || g === "C+") return "var(--clr-amber)";
  return "var(--clr-accent-2)";
}
