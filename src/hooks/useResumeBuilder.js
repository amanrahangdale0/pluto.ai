import { useCallback, useMemo, useState } from "react";
import { generateResume } from "../utils/generateResume";

const EMPTY_EXPERIENCE = {
  jobTitle: "", company: "", location: "", startDate: "", endDate: "", current: false, description: "",
};
const EMPTY_EDUCATION = { degree: "", institution: "", year: "", grade: "" };

export const INITIAL_PERSONAL = {
  name: "", title: "", email: "", phone: "", location: "", linkedin: "", portfolio: "", bio: "",
};

/** Stateful logic for the multi-step resume builder. */
export function useResumeBuilder() {
  const [step, setStep] = useState(0);
  const [personal, setPersonal] = useState(INITIAL_PERSONAL);
  const [experience, setExperience] = useState([{ ...EMPTY_EXPERIENCE }]);
  const [education, setEducation] = useState([{ ...EMPTY_EDUCATION }]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [certifications, setCertifications] = useState("");
  const [template, setTemplate] = useState("modern");

  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [generated, setGenerated] = useState(null);
  const [error, setError] = useState("");

  const updatePersonal = useCallback((patch) => setPersonal((p) => ({ ...p, ...patch })), []);

  const addExperience = useCallback(() => setExperience((e) => [...e, { ...EMPTY_EXPERIENCE }]), []);
  const removeExperience = useCallback((i) => setExperience((e) => e.filter((_, idx) => idx !== i)), []);
  const updateExperience = useCallback((i, patch) =>
    setExperience((e) => e.map((item, idx) => (idx === i ? { ...item, ...patch } : item))), []);

  const addEducation = useCallback(() => setEducation((e) => [...e, { ...EMPTY_EDUCATION }]), []);
  const removeEducation = useCallback((i) => setEducation((e) => e.filter((_, idx) => idx !== i)), []);
  const updateEducation = useCallback((i, patch) =>
    setEducation((e) => e.map((item, idx) => (idx === i ? { ...item, ...patch } : item))), []);

  const formComplete = useMemo(
    () => personal.name.trim() && personal.title.trim(),
    [personal.name, personal.title]
  );

  const generate = useCallback(async () => {
    setStatus("loading");
    setError("");
    const payload = { personal, experience, education, skills, languages, certifications };
    try {
      const ai = await generateResume(payload);
      setGenerated(ai);
      setStatus("done");
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Generation failed.");
      setStatus("error");
    }
  }, [personal, experience, education, skills, languages, certifications]);

  /** Merge raw form data with AI output into the shape templates expect. */
  const resume = useMemo(() => {
    const expDuration = (e) =>
      [e.startDate, e.current ? "Present" : e.endDate].filter(Boolean).join(" – ");

    const aiExp = generated?.enhancedExperience || [];
    const mergedExperience = experience.map((e, i) => ({
      jobTitle: e.jobTitle,
      company: e.company,
      location: e.location,
      duration: aiExp[i]?.duration || expDuration(e),
      bullets:
        aiExp[i]?.bullets && aiExp[i].bullets.length
          ? aiExp[i].bullets
          : e.description
            ? [e.description]
            : [],
    }));

    const allSkills = Array.from(new Set([...skills, ...(generated?.suggestedSkills || [])]));

    return {
      name: personal.name || "Your Name",
      title: personal.title || "Your Title",
      email: personal.email,
      phone: personal.phone,
      location: personal.location,
      linkedin: personal.linkedin,
      portfolio: personal.portfolio,
      summary: generated?.enhancedSummary || personal.bio,
      experience: mergedExperience,
      education,
      skills: allSkills,
      languages,
    };
  }, [personal, experience, education, skills, languages, generated]);

  const reset = useCallback(() => {
    setStatus("idle");
    setGenerated(null);
    setError("");
  }, []);

  return {
    step, setStep,
    personal, updatePersonal,
    experience, addExperience, removeExperience, updateExperience,
    education, addEducation, removeEducation, updateEducation,
    skills, setSkills,
    languages, setLanguages,
    certifications, setCertifications,
    template, setTemplate,
    status, generated, error, generate, reset,
    formComplete, resume,
  };
}
