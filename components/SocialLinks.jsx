import { site } from '@/lib/site';

const ICONS = {
  facebook: (
    <path d="M17 2h-3a5 5 0 0 0-5 5v3H6v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <path d="M4.5 9v11M9 20v-6.2A2.8 2.8 0 0 1 11.8 11h.4A2.8 2.8 0 0 1 15 13.8V20M9 11v9" />
      <circle cx="4.5" cy="4.8" r="1.6" />
    </>
  ),
};

const LABELS = { facebook: 'Facebook', instagram: 'Instagram', linkedin: 'LinkedIn' };

export default function SocialLinks() {
  return (
    <ul className="socials">
      {Object.entries(site.social).map(([key, href]) => (
        <li key={key}>
          <a
            href={href}
            rel="noopener noreferrer nofollow"
            target="_blank"
            aria-label={`${LABELS[key]} — opens in a new tab`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {ICONS[key]}
            </svg>
            <span>{LABELS[key]}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
