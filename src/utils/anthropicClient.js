import { callClaudeServer } from "../lib/api/ai.functions";

export const ANTHROPIC_MODEL = "claude-sonnet-4-20250514";

export function getApiKey() {
  return "managed-server-side";
}

export function hasApiKey() {
  return true;
}

export function setApiKey() {
  // no-op
}

export function parseModelJson(raw) {
  let text = (raw || "").trim();
  text = text.replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end !== -1) text = text.slice(start, end + 1);
  return JSON.parse(text);
}

export async function callClaude({ system, user, maxTokens = 1500 }) {
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    throw new Error("You appear to be offline. Check your connection and try again.");
  }
  
  return await callClaudeServer({
    data: { system, user, maxTokens }
  });
}
