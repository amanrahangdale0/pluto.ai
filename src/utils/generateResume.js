import { callClaude, parseModelJson } from "./anthropicClient";

const SYSTEM_PROMPT = `You are a professional resume writer. Given user's raw resume data, return ONLY a valid JSON object enhancing their content professionally.

JSON structure:
{
  "enhancedSummary": string,
  "enhancedExperience": [
    {
      "jobTitle": string, "company": string, "duration": string,
      "bullets": string[] (3-4 achievement-focused bullet points)
    }
  ],
  "suggestedSkills": string[]
}

Use strong action verbs. Quantify where implied. Keep it honest and professional. No fluff.`;

/**
 * Generate enhanced resume content from raw form data.
 * @param {object} formData
 * @returns {Promise<{enhancedSummary:string, enhancedExperience:Array, suggestedSkills:string[]}>}
 */
export async function generateResume(formData) {
  const raw = await callClaude({
    system: SYSTEM_PROMPT,
    user: JSON.stringify(formData),
    maxTokens: 1500,
  });
  try {
    return parseModelJson(raw);
  } catch {
    throw new Error("The AI response couldn't be parsed. Please try again.");
  }
}
