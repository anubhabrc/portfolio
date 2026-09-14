import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import {
  ArrowRightIcon,
  CalendarIcon,
  DownloadIcon,
  LocationIcon,
  SocialIcon,
} from "./icons";
import CopyEmail from "./copy-email";

export default function Home() {
  return (
    <div className="content-column home-page">
      <section className="hero" aria-labelledby="profile-heading">
        <div className="hero-row">
          <Image
            src={site.avatar}
            alt={`${site.name} pixel avatar`}
            width={104}
            height={104}
            priority
            className="avatar"
          />
          <div className="hero-copy">
            <h1 id="profile-heading">{site.name}</h1>
            <p className="hero-meta">{site.headline}</p>
          </div>
        </div>

        <div className="profile-details" aria-label="Profile details">
          <div className="profile-detail">
            <p className="profile-detail-label">Location</p>
            <p className="profile-detail-value">
              <LocationIcon />
              <span>{site.location}</span>
            </p>
          </div>

          <div className="profile-detail profile-detail-email">
            <p className="profile-detail-label">Email</p>
            <div className="profile-detail-value">
              <span className="profile-email-address">{site.email}</span>
              <CopyEmail
                email={site.email}
                icon="copy"
                className="profile-copy-button"
              />
            </div>
          </div>

          <div className="profile-detail">
            <p className="profile-detail-label">Resume</p>
            <a
              className="profile-resume-link"
              href="/resume.pdf"
              download
              data-sound="interaction.confirm"
              data-sound-volume="1"
            >
              <span>Download</span>
              <DownloadIcon />
            </a>
          </div>
        </div>

        <p className="bio">{site.bio}</p>

        <div className="social-row" aria-label="Social links">
          {site.socials.map((social) => (
            social.icon === "mail" ? (
              <CopyEmail
                key={social.label}
                email={site.email}
                className="social-email-button"
                style={{ color: social.color }}
              />
            ) : (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                title={social.label}
                style={{ color: social.color }}
              >
                <SocialIcon name={social.icon} />
              </a>
            )
          ))}
        </div>
      </section>

      <section id="experience" className="section-block">
        <div className="section-heading-row">
          <h2>Experience</h2>
          <Link
            className="read-more section-heading-link"
            href="/work"
            data-sound="interaction.tap"
            data-sound-volume="0.95"
          >
            View more <ArrowRightIcon />
          </Link>
        </div>
        <div className="experience-list">
          {site.experience.map((item) => (
            <article
              className="experience-row"
              key={`${item.company}-${item.role}`}
            >
              <div>
                <div className="experience-title-line">
                  <h3>{item.company}</h3>
                  {item.current && (
                    <span className="working-pill">
                      <i />
                      Working
                    </span>
                  )}
                </div>
                <p>{item.role}</p>
              </div>
              <div className="experience-time">
                <p>{item.period}</p>
                <p>{item.location}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block blog-section">
        <h2>Blog</h2>
        <div className="blog-list">
          {site.blogs.map((post) => (
            <article className="blog-row" key={post.title}>
              <div className="blog-main">
                <h3>
                  <Link href={post.href} data-sound="interaction.tap" data-sound-volume="0.85">{post.title}</Link>
                </h3>
                <p>{post.description}</p>
                <div className="blog-date">
                  <CalendarIcon />
                  <span>{post.date}</span>
                </div>
              </div>
              <Link className="read-more" href={post.href} data-sound="interaction.tap" data-sound-volume="0.95">
                Read more <ArrowRightIcon />
              </Link>
            </article>
          ))}
        </div>
        <div className="center-action">
          <Link className="outline-button" href="/blog" data-sound="interaction.tap">
            Show all blogs
          </Link>
        </div>
      </section>

      <section id="development" className="section-block cards-section">
        <h2>Development</h2>
        <div className="resource-list">
          {site.development.map((card) => (
            <a className="resource-card" key={card.title} href={card.href}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section
        id="personal"
        className="section-block cards-section personal-section"
      >
        <h2>Personal</h2>
        <div className="resource-list">
          {site.personal.map((card) => (
            <a className="resource-card" key={card.title} href={card.href}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* <blockquote className="quote-card">
        <span className="quote-mark">“</span>
        <p>“{site.quote.text}”</p>
        <cite>– {site.quote.source}</cite>
      </blockquote> */}
    </div>
  );
}
