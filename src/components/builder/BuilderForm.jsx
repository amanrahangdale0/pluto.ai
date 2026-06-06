import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Plus, Trash2, Sparkles } from "lucide-react";
import FloatingInput from "./FloatingInput";
import TagInput from "./TagInput";
import TemplateSelector from "./TemplateSelector";

const STEPS = ["Personal", "Experience", "Education & Skills", "Template"];

/** @param {{b: ReturnType<import('../../hooks/useResumeBuilder').useResumeBuilder>}} props */
export default function BuilderForm({ b }) {
  const { step, setStep } = b;
  const last = STEPS.length - 1;

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-3 flex justify-between">
          {STEPS.map((s, i) => (
            <span key={s} className="text-xs font-medium" style={{ color: i <= step ? "var(--clr-accent)" : "var(--clr-muted)" }}>
              {s}
            </span>
          ))}
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-[var(--clr-surface-2)]">
          <motion.div className="h-full rounded-full shimmer-bg" animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }} transition={{ duration: 0.4 }} />
        </div>
      </div>

      <div className="glass rounded-3xl p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && <StepPersonal b={b} />}
            {step === 1 && <StepExperience b={b} />}
            {step === 2 && <StepEducation b={b} />}
            {step === 3 && <TemplateSelector selected={b.template} onSelect={b.setTemplate} locked={!b.formComplete} />}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-[var(--clr-muted)] transition-colors hover:text-[var(--clr-text)] disabled:opacity-30"
          >
            <ArrowLeft size={16} /> Back
          </button>

          {step < last ? (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setStep(step + 1)}
              className="shimmer-bg flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white"
            >
              Next <ArrowRight size={16} />
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={!b.formComplete || b.status === "loading"}
              onClick={b.generate}
              className="glow-ring flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--clr-accent)] to-[var(--clr-accent-2)] px-7 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            >
              <Sparkles size={16} /> {b.status === "loading" ? "Generating…" : "Generate Resume"}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

function StepPersonal({ b }) {
  const { personal: p, updatePersonal: u } = b;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FloatingInput label="Full Name" value={p.name} onChange={(v) => u({ name: v })} placeholder="Ada Lovelace" />
      <FloatingInput label="Professional Title" value={p.title} onChange={(v) => u({ title: v })} placeholder="Full Stack Developer @ Dreams Inc." />
      <FloatingInput label="Email" type="email" value={p.email} onChange={(v) => u({ email: v })} placeholder="ada@brilliant.dev" />
      <FloatingInput label="Phone" type="tel" value={p.phone} onChange={(v) => u({ phone: v })} placeholder="+91 98765 43210" />
      <FloatingInput label="Location" value={p.location} onChange={(v) => u({ location: v })} placeholder="Mumbai, India" />
      <FloatingInput label="LinkedIn (optional)" value={p.linkedin} onChange={(v) => u({ linkedin: v })} placeholder="linkedin.com/in/ada" />
      <div className="sm:col-span-2">
        <FloatingInput label="Portfolio / GitHub (optional)" value={p.portfolio} onChange={(v) => u({ portfolio: v })} placeholder="github.com/ada" />
      </div>
      <div className="sm:col-span-2">
        <FloatingInput label="Brief Bio / Summary" textarea value={p.bio} onChange={(v) => u({ bio: v })} placeholder="I build things that matter..." />
      </div>
    </div>
  );
}

function StepExperience({ b }) {
  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence>
        {b.experience.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-2xl border border-[var(--clr-border)] p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wide text-[var(--clr-muted)]">Role {i + 1}</span>
              {b.experience.length > 1 && (
                <button onClick={() => b.removeExperience(i)} className="text-[var(--clr-accent-2)]"><Trash2 size={15} /></button>
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <FloatingInput label="Job Title" value={e.jobTitle} onChange={(v) => b.updateExperience(i, { jobTitle: v })} />
              <FloatingInput label="Company" value={e.company} onChange={(v) => b.updateExperience(i, { company: v })} />
              <FloatingInput label="Location" value={e.location} onChange={(v) => b.updateExperience(i, { location: v })} />
              <div className="grid grid-cols-2 gap-3">
                <FloatingInput label="Start" value={e.startDate} onChange={(v) => b.updateExperience(i, { startDate: v })} />
                <FloatingInput label="End" value={e.endDate} onChange={(v) => b.updateExperience(i, { endDate: v })} />
              </div>
            </div>
            <label className="mt-2 flex items-center gap-2 text-sm text-[var(--clr-muted)]">
              <input type="checkbox" checked={e.current} onChange={(ev) => b.updateExperience(i, { current: ev.target.checked })} className="accent-[var(--clr-accent)]" />
              Currently working here
            </label>
            <div className="mt-3">
              <FloatingInput label="Description (AI will enhance this)" textarea rows={2} value={e.description} onChange={(v) => b.updateExperience(i, { description: v })} />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <button onClick={b.addExperience} className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--clr-border)] py-3 text-sm text-[var(--clr-accent)] transition-colors hover:border-[var(--clr-accent)]">
        <Plus size={16} /> Add Another Experience
      </button>
    </div>
  );
}

function StepEducation({ b }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {b.education.map((ed, i) => (
            <motion.div key={i} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="rounded-2xl border border-[var(--clr-border)] p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wide text-[var(--clr-muted)]">Education {i + 1}</span>
                {b.education.length > 1 && <button onClick={() => b.removeEducation(i)} className="text-[var(--clr-accent-2)]"><Trash2 size={15} /></button>}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <FloatingInput label="Degree" value={ed.degree} onChange={(v) => b.updateEducation(i, { degree: v })} />
                <FloatingInput label="Institution" value={ed.institution} onChange={(v) => b.updateEducation(i, { institution: v })} />
                <FloatingInput label="Year" value={ed.year} onChange={(v) => b.updateEducation(i, { year: v })} />
                <FloatingInput label="CGPA / % (optional)" value={ed.grade} onChange={(v) => b.updateEducation(i, { grade: v })} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <button onClick={b.addEducation} className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--clr-border)] py-3 text-sm text-[var(--clr-accent)] transition-colors hover:border-[var(--clr-accent)]">
          <Plus size={16} /> Add Education
        </button>
      </div>
      <TagInput label="Skills" tags={b.skills} onChange={b.setSkills} placeholder="React, Python, Figma..." />
      <TagInput label="Languages (optional)" tags={b.languages} onChange={b.setLanguages} placeholder="English, Hindi..." />
      <FloatingInput label="Certifications (optional)" textarea rows={2} value={b.certifications} onChange={b.setCertifications} placeholder="AWS Certified, Google UX..." />
    </div>
  );
}
