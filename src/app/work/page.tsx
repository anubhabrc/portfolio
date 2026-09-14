import SiteFrame from '@/components/site-frame';
import { /* site, */ workExperienceDetails } from '@/data/site';

function TechBadge({ name, mark, color, markColor }: { name: string; mark: string; color: string; markColor?: string }) {
  return (
    <span className="tech-badge" title={name} aria-label={name}>
      <span className="tech-mark" style={{ background: color, color: markColor ?? '#ffffff' }} aria-hidden="true">
        {mark}
      </span>
    </span>
  );
}

export default function WorkPage() {
  return (
    <SiteFrame>
      <div className="content-column inner-page work-page">
        <header className="work-page-heading">
          <h1>Work Experience</h1>
          <p>My work experiences across different companies and roles.</p>
        </header>

        <section className="work-experience-list" aria-label="Work experience">
          {workExperienceDetails.map((item) => (
            <article className="work-experience-item" key={`${item.company}-${item.role}`}>
              <div className="work-experience-header">
                <div className="work-experience-main">
                  <div className="work-company-line">
                    <h2>{item.company}</h2>
                    {item.current && (
                      <span className="working-pill">
                        <i />
                        Working
                      </span>
                    )}
                  </div>
                  <p>{item.role}</p>
                </div>

                <div className="work-experience-time">
                  <p>{item.period}</p>
                  <p>{item.location}</p>
                </div>
              </div>

              <div className="work-experience-divider" />

              <div className="work-detail-block">
                <h3>Technologies &amp; Tools</h3>
                <div className="tech-badges" aria-label={`Technologies used at ${item.company}`}>
                  {item.technologies.map((tech) => (
                    <TechBadge key={tech.name} {...tech} />
                  ))}
                </div>
              </div>

              <div className="work-detail-block work-done-block">
                <h3>What I&apos;ve done</h3>
                <ul>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </section>

        {/* <blockquote className="quote-card work-quote-card">
          <span className="quote-mark">“</span>
          <p>“{site.quote.text}”</p>
          <cite>– {site.quote.source}</cite>
        </blockquote> */}
      </div>
    </SiteFrame>
  );
}
