import { createServerFn } from "@tanstack/react-start";
import { openRouterKey } from "../config.server";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = "anthropic/claude-sonnet-4.6";

export const callClaudeServer = createServerFn({ method: "POST" })
  .handler(async ({ data }: { data: { system: string; user: string; maxTokens?: number } }) => {
    const { system, user, maxTokens = 1500 } = data;
    
    if (!openRouterKey) {
      throw new Error("MISSING_API_KEY");
    }

    let res;
    try {
      res = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${openRouterKey}`,
          "HTTP-Referer": "https://pluto.ai",
          "X-Title": "Pluto.ai",
        },
        body: JSON.stringify({
          model: OPENROUTER_MODEL,
          max_tokens: maxTokens,
          messages: [
            { role: "system", content: system },
            { role: "user", content: user }
          ],
        }),
      });
    } catch {
      throw new Error("Network error reaching the AI service. Please try again.");
    }

    if (!res.ok) {
      if (res.status === 401) throw new Error("Invalid API key. Check your OpenRouter key.");
      if (res.status === 429) throw new Error("Rate limited by the AI service. Try again shortly.");
      throw new Error(`AI service error (${res.status}). Please try again.`);
    }

    const json = await res.json();
    const text = json.choices?.[0]?.message?.content || "";
    if (!text) throw new Error("The AI returned an empty response. Please retry.");
    
    return text;
  });
