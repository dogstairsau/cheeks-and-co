import Image from 'next/image';
import { clients } from '@/lib/site';

export default function Clients({ label = 'Some legends we work with' }) {
  return (
    <section className="clients" aria-label="Clients we work with">
      <div className="shell">
        <p className="clients__label" data-reveal>{label}</p>
        <ul className="clients__grid" data-reveal-stagger>
          {clients.map((c) => (
            <li key={c.name}>
              <Image src={c.logo} alt={c.name} width={200} height={80} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
