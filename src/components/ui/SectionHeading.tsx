import type { ReactNode } from 'react';

import styles from './SectionHeading.module.css';

type Props = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  align?: 'start' | 'center';
};

export default function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  id,
  align = 'start',
}: Props) {
  return (
    <header className={styles.heading} data-align={align} data-reveal>
      <p className={styles.eyebrow}>
        <span className={styles.index}>{index}</span>
        <span className={styles.line} aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {lead && <p className={styles.lead}>{lead}</p>}
    </header>
  );
}
