import { callClaude, parseModelJson } from "./anthropicClient";

const SYSTEM_PROMPT = `You are a professional resume reviewer with 15+ years of experience in hiring across tech, design, and business roles. Analyze the resume text provided and return ONLY a valid JSON object with NO markdown, no backticks, no explanation.

JSON structure:
{
  "overallScore": number (0-100),
  "grade": string ('A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D'),
  "summary": string (2-3 sentence overall assessment),
  "sections": {
    "contact": { "score": number, "feedback": string, "missing": string[] },
    "summary": { "score": number, "feedback": string, "missing": string[] },
    "experience": { "score": number, "feedback": string, "missing": string[] },
    "education": { "score": number, "feedback": string, "missing": string[] },
    "skills": { "score": number, "feedback": string, "missing": string[] }
  },
  "strengths": string[] (3-5 items),
  "improvements": string[] (3-5 actionable items),
  "keywords": string[] (5-10 important keywords found or missing),
  "atsScore": number (0-100, ATS compatibility),
  "readabilityScore": number (0-100),
  "impactScore": number (0-100, use of action verbs, quantified results)
}`;

/**
 * Analyze resume text with Claude.
 * @param {string} text extracted resume text
 * @returns {Promise<object>} structured analysis
 */
export async function analyzeResume(text) {
  if (!text || text.trim().length < 20) {
    throw new Error("There isn't enough text to analyze. Please check the file.");
  }
  const raw = await callClaude({
    system: SYSTEM_PROMPT,
    user: `Analyze this resume:\n\n${text}`,
    maxTokens: 1500,
  });
  try {
    return parseModelJson(raw);
  } catch {
    throw new Error("The AI response couldn't be parsed. Please try again.");
  }
}
