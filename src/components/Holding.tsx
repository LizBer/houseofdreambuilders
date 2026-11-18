import { useState } from 'react';

// Holding page while the business is being rebuilt.
// Logo: drop the real file at public/logo.png (PNG, SVG-as-PNG, transparent background works best).
// Until it exists, a temporary mark is shown.
const INSTAGRAM_HANDLE = 'thelizzybermudez';

function TempMark() {
  return (
    <svg className="h-brand__mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="8" fill="hsl(27 82% 60%)" />
      <path d="M8 9v14M17 9v14M8 16h9" fill="none" stroke="hsl(20 45% 7%)" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M23.5 6v20" stroke="hsl(34 45% 96%)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function Holding() {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <div className="holding">
      <header className="h-bar h-wrap">
        <a className="h-brand" href="/" aria-label="House of Dreambuilders, home">
          {logoFailed ? (
            <TempMark />
          ) : (
            <img className="h-brand__logo" src="/logo.png" alt="" onError={() => setLogoFailed(true)} />
          )}
          <span>House of Dreambuilders</span>
        </a>
      </header>

      <main className="h-main h-wrap">
        <h1 className="h-title">
          <span className="h-re">Re</span>
          <span className="h-word">inventing</span>
          <span className="h-caret" aria-hidden="true" />
        </h1>

        <div className="h-note">
          <p className="h-lead">I’m rebuilding how I help women build their business with AI.</p>
          <p className="h-body">
            Busy raising kids, maybe have a full-time job, trying to start a business in the margins of life?{' '}
            <strong>If that’s you, DM me.</strong>
          </p>
          <a className="h-ig" href={`https://www.instagram.com/${INSTAGRAM_HANDLE}/`} target="_blank" rel="noopener noreferrer">
            <span className="h-ig__ink" aria-hidden="true" />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <rect x="3" y="3" width="18" height="18" rx="5.2" />
              <circle cx="12" cy="12" r="4.1" />
              <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
            </svg>
            <span>@{INSTAGRAM_HANDLE}</span>
            <svg className="h-ig__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </main>

      <footer className="h-foot h-wrap">&copy; House of Dreambuilders</footer>
    </div>
  );
}
