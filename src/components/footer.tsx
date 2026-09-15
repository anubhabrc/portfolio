import Link from "next/link";
import { site } from "@/data/site";
import { SocialIcon } from "./icons";
import CopyEmail from "./copy-email";

const nav = [
  ["Home", "/"],
  ["Work", "/work"],
  ["Blog", "/blog"],
  ["Resume", "/resume"],
] as const;

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-columns">
          <section>
            <p className="footer-label">NAVIGATE</p>
            <div className="footer-nav">
              {nav.map(([label, href]) => (
                <Link key={label} href={href} data-sound="interaction.tap" data-sound-volume="0.85">
                  {label}
                </Link>
              ))}
            </div>
          </section>
          <section className="footer-connect">
            <p className="footer-label">CONNECT</p>
            <div className="footer-socials">
              {site.socials.map((item) => (
                item.icon === "mail" ? (
                  <CopyEmail
                    key={item.label}
                    email={site.email}
                    className="social-square"
                    style={{ color: item.color }}
                  />
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="social-square"
                    style={{ color: item.color }}
                  >
                    <SocialIcon name={item.icon} />
                  </a>
                )
              ))}
            </div>
          </section>
        </div>
        <div className="copyright">
          By {site.name}, {new Date().getFullYear()}.
        </div>
      </div>
    </footer>
  );
}
