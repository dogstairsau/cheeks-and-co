/**
 * The organic section divider, echoing the curve of the Cheek Mark.
 *
 * The band carries the colour of the section above (`from`); the path is the
 * section below (`to`), so the next section appears to sweep up into the
 * current one. `flip` mirrors the curve.
 *
 * `cap` turns it into an overlay rather than a divider: the band goes
 * transparent and only the curve is drawn, in the `from` colour, so whatever
 * sits behind shows through the rest. That is what curves a flat colour into
 * a photograph — 'top' sweeps the colour down from above, 'bottom' up from
 * below. A capped swoop is positioned by its container, not by flow.
 */
export default function Swoop({ from = 'paper', to = 'charcoal', flip = false, cap = null }) {
  const d = cap === 'top'
    ? 'M0 92C380 126 780 46 1440 16V0H0Z'
    : 'M0 92C380 126 780 46 1440 16V120H0Z';

  const className = [
    'swoop',
    cap ? `swoop--cap swoop--cap-${cap}` : '',
    flip ? 'swoop--flip' : '',
    `swoop--from-${from}`,
    `swoop--to-${to}`,
  ].filter(Boolean).join(' ');

  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d={d} />
      </svg>
    </div>
  );
}
