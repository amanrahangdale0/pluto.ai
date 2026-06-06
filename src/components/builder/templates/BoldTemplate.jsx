/**
 * Bold template — gradient header + skill bars.
 * @param {{data: object}} props
 */
export default function BoldTemplate({ data }) {
  const {
    name, title, email, phone, location, linkedin, portfolio,
    summary, experience = [], education = [], skills = [], languages = [],
  } = data;

  const contacts = [email, phone, location, linkedin, portfolio].filter(Boolean);

  return (
    <div className="min-h-full bg-white" style={{ fontFamily: "'DM Sans', sans-serif", color: "#1a1a26" }}>
      <header
        className="px-9 py-8 text-white"
        style={{ background: "linear-gradient(120deg, #7c6fff, #ff6b8a)" }}
      >
        <h1 className="font-head text-4xl font-extrabold tracking-tight">{name}</h1>
        <p className="mt-1 text-base font-medium text-white/90">{title}</p>
        <p className="mt-3 text-xs text-white/80">{contacts.join("  ·  ")}</p>
      </header>

      <div className="grid grid-cols-[1.6fr_1fr] gap-8 p-9">
        <main>
          {summary && (
            <Section heading="Profile" color="#7c6fff">
              <p className="text-sm leading-relaxed text-[#444]">{summary}</p>
            </Section>
          )}
          {experience.length > 0 && (
            <Section heading="Experience" color="#ff6b8a">
              {experience.map((e, i) => (
                <div key={i} className="mb-4">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-head text-sm font-bold">{e.jobTitle}</h3>
                    <span className="text-xs text-[#999]">{e.duration}</span>
                  </div>
                  <p className="text-xs font-semibold text-[#7c6fff]">{e.company}</p>
                  <ul className="mt-1.5 list-disc space-y-1 pl-4 text-sm text-[#444]">
                    {(e.bullets || []).map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </Section>
          )}
        </main>

        <aside>
          {skills.length > 0 && (
            <Section heading="Skills" color="#00d4aa">
              <div className="space-y-2.5">
                {skills.map((s, i) => {
                  const pct = 70 + ((i * 7) % 30);
                  return (
                    <div key={i}>
                      <p className="mb-1 text-xs font-medium">{s}</p>
                      <div className="h-1.5 rounded-full bg-[#eee]">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#7c6fff,#ff6b8a)" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Section>
          )}
          {education.length > 0 && (
            <Section heading="Education" color="#7c6fff">
              {education.map((ed, i) => (
                <div key={i} className="mb-2">
                  <h3 className="font-head text-sm font-bold">{ed.degree}</h3>
                  <p className="text-xs text-[#666]">{ed.institution} · {ed.year}{ed.grade ? ` · ${ed.grade}` : ""}</p>
                </div>
              ))}
            </Section>
          )}
          {languages.length > 0 && (
            <Section heading="Languages" color="#ff6b8a">
              <p className="text-sm text-[#444]">{languages.join(", ")}</p>
            </Section>
          )}
        </aside>
      </div>
    </div>
  );
}

function Section({ heading, color, children }) {
  return (
    <section className="mb-6">
      <h2 className="mb-2 font-head text-sm font-extrabold uppercase tracking-wider" style={{ color }}>{heading}</h2>
      {children}
    </section>
  );
}
