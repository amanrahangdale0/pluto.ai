/**
 * Modern template — dark sidebar + white main column.
 * @param {{data: object}} props
 */
export default function ModernTemplate({ data }) {
  const {
    name, title, email, phone, location, linkedin, portfolio,
    summary, experience = [], education = [], skills = [], languages = [],
  } = data;

  return (
    <div className="flex min-h-full" style={{ fontFamily: "'DM Sans', sans-serif", color: "#1a1a26" }}>
      {/* Sidebar */}
      <aside className="w-[32%] bg-[#0f1426] p-7 text-white">
        <h1 className="font-head text-2xl font-extrabold leading-tight">{name}</h1>
        <p className="mt-1 text-sm text-[#00d4aa]">{title}</p>

        <div className="mt-7 space-y-4 text-xs">
          <Block heading="Contact" color="#00d4aa">
            {email && <p className="break-all">{email}</p>}
            {phone && <p>{phone}</p>}
            {location && <p>{location}</p>}
            {linkedin && <p className="break-all">{linkedin}</p>}
            {portfolio && <p className="break-all">{portfolio}</p>}
          </Block>

          {skills.length > 0 && (
            <Block heading="Skills" color="#00d4aa">
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, i) => (
                  <span key={i} className="rounded bg-white/10 px-2 py-0.5">{s}</span>
                ))}
              </div>
            </Block>
          )}

          {languages.length > 0 && (
            <Block heading="Languages" color="#00d4aa">
              {languages.map((l, i) => <p key={i}>{l}</p>)}
            </Block>
          )}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-white p-8">
        {summary && (
          <Section heading="Profile">
            <p className="text-sm leading-relaxed text-[#444]">{summary}</p>
          </Section>
        )}
        {experience.length > 0 && (
          <Section heading="Experience">
            {experience.map((e, i) => (
              <div key={i} className="mb-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-head text-sm font-bold">{e.jobTitle}</h3>
                  <span className="text-xs text-[#888]">{e.duration}</span>
                </div>
                <p className="text-xs font-medium text-[#00a888]">{e.company}{e.location ? ` · ${e.location}` : ""}</p>
                <ul className="mt-1.5 list-disc space-y-1 pl-4 text-sm text-[#444]">
                  {(e.bullets || []).map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            ))}
          </Section>
        )}
        {education.length > 0 && (
          <Section heading="Education">
            {education.map((ed, i) => (
              <div key={i} className="mb-2">
                <h3 className="font-head text-sm font-bold">{ed.degree}</h3>
                <p className="text-xs text-[#666]">{ed.institution} · {ed.year}{ed.grade ? ` · ${ed.grade}` : ""}</p>
              </div>
            ))}
          </Section>
        )}
      </main>
    </div>
  );
}

function Block({ heading, color, children }) {
  return (
    <div>
      <h2 className="mb-1.5 font-head text-[11px] font-bold uppercase tracking-wider" style={{ color }}>{heading}</h2>
      <div className="space-y-1 text-white/80">{children}</div>
    </div>
  );
}

function Section({ heading, children }) {
  return (
    <section className="mb-6">
      <h2 className="mb-2 border-l-[3px] border-[#00d4aa] pl-2 font-head text-base font-extrabold uppercase tracking-wide">{heading}</h2>
      {children}
    </section>
  );
}
