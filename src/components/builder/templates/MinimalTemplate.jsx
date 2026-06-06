/**
 * Minimal template — single column, generous whitespace.
 * @param {{data: object}} props
 */
export default function MinimalTemplate({ data }) {
  const {
    name, title, email, phone, location, linkedin, portfolio,
    summary, experience = [], education = [], skills = [], languages = [],
  } = data;

  const contacts = [email, phone, location, linkedin, portfolio].filter(Boolean);

  return (
    <div className="min-h-full bg-white p-12" style={{ fontFamily: "'DM Sans', sans-serif", color: "#1a1a26" }}>
      <header className="text-center">
        <h1 className="font-head text-4xl font-extrabold tracking-tight">{name}</h1>
        <p className="mt-1 text-sm uppercase tracking-[0.25em] text-[#888]">{title}</p>
        <p className="mt-3 text-xs text-[#666]">{contacts.join("  ·  ")}</p>
      </header>

      <hr className="my-7 border-[#e5e5ee]" />

      {summary && (
        <Section heading="Summary">
          <p className="text-sm leading-7 text-[#444]">{summary}</p>
        </Section>
      )}

      {experience.length > 0 && (
        <Section heading="Experience">
          {experience.map((e, i) => (
            <div key={i} className="mb-5">
              <div className="flex items-baseline justify-between">
                <h3 className="font-head text-sm font-bold">{e.jobTitle} — {e.company}</h3>
                <span className="text-xs text-[#999]">{e.duration}</span>
              </div>
              <ul className="mt-1.5 list-disc space-y-1 pl-4 text-sm leading-6 text-[#444]">
                {(e.bullets || []).map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section heading="Education">
          {education.map((ed, i) => (
            <p key={i} className="mb-1 text-sm text-[#444]">
              <span className="font-semibold">{ed.degree}</span>, {ed.institution} · {ed.year}{ed.grade ? ` · ${ed.grade}` : ""}
            </p>
          ))}
        </Section>
      )}

      {skills.length > 0 && (
        <Section heading="Skills">
          <p className="text-sm text-[#444]">{skills.join("  ·  ")}</p>
        </Section>
      )}

      {languages.length > 0 && (
        <Section heading="Languages">
          <p className="text-sm text-[#444]">{languages.join("  ·  ")}</p>
        </Section>
      )}
    </div>
  );
}

function Section({ heading, children }) {
  return (
    <section className="mb-6">
      <h2 className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#999]">{heading}</h2>
      {children}
    </section>
  );
}
