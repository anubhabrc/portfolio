import SiteFrame from '@/components/site-frame';
import { DownloadIcon } from '@/components/icons';

export default function ResumePage() {
  return (
    <SiteFrame>
      <div className="content-column inner-page resume-page">
        <header className="resume-heading">
          <div className="resume-title-row">
            <h1>Resume</h1>
            <a
              className="resume-download-button"
              href="/resume.pdf"
              download
              aria-label="Download resume"
              title="Download resume"
              data-sound="interaction.confirm"
              data-sound-volume="1"
            >
              <DownloadIcon />
            </a>
          </div>
          <p>View and download my professional resume.</p>
        </header>

        <div className="resume-divider" />

        <section className="resume-pdf-shell" aria-label="Resume PDF viewer">
          <iframe
            className="resume-pdf-viewer"
            src="/resume.pdf#view=FitH&toolbar=1&navpanes=0"
            title="Anubhab Roy Chowdhury Resume"
          />
          <noscript>
            <p className="resume-fallback">
              JavaScript is disabled. <a href="/resume.pdf">Open the resume PDF</a> instead.
            </p>
          </noscript>
        </section>
      </div>
    </SiteFrame>
  );
}
