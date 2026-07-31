const ITEMS = [
  'Marketing Strategy',
  'Digital Advertising',
  'Media Buying',
  'Website Development',
  'Graphic Design',
  'Organic Social',
  'Partnerships',
];

/** Motion.jsx clones the group until it covers the viewport, then loops it. */
export default function Marquee() {
  return (
    <section className="marquee" aria-label="Our services at a glance">
      <div className="marquee__track" data-marquee>
        <div className="marquee__group">
          {ITEMS.map((item) => (
            <span key={item}>
              {item}
              <em aria-hidden="true">✦</em>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
