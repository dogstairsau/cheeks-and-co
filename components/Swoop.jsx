/**
 * The organic section divider, echoing the curve of the Cheek Mark.
 *
 * The band carries the colour of the section above (`from`); the path is the
 * section below (`to`), so the next section appears to sweep up into the
 * current one. `flip` mirrors the curve.
 */
export default function Swoop({ from = 'paper', to = 'charcoal', flip = false }) {
  const className = [
    'swoop',
    flip ? 'swoop--flip' : '',
    `swoop--from-${from}`,
    `swoop--to-${to}`,
  ].filter(Boolean).join(' ');

  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0 92C380 126 780 46 1440 16V120H0Z" />
      </svg>
    </div>
  );
}
