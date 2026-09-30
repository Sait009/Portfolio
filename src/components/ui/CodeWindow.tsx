import type { ReactNode } from 'react';

import styles from './CodeWindow.module.css';

type CodeValue = string | boolean | readonly string[];
export type CodeEntry = readonly [key: string, value: CodeValue];

type Props = {
  filename: string;
  variable: string;
  entries: CodeEntry[];
};

function renderValue(value: CodeValue): ReactNode {
  if (typeof value === 'boolean') return <span className={styles.boolean}>{String(value)}</span>;
  if (typeof value === 'string') return <span className={styles.string}>&apos;{value}&apos;</span>;
  return (
    <>
      [
      {value.map((item, i) => (
        <span key={item}>
          <span className={styles.string}>&apos;{item}&apos;</span>
          {i < value.length - 1 && ', '}
        </span>
      ))}
      ]
    </>
  );
}

/** หน้าต่าง editor จำลองพร้อม syntax highlight (render ฝั่ง server, ไม่มี JS) */
export default function CodeWindow({ filename, variable, entries }: Props) {
  return (
    <figure className={styles.window}>
      <figcaption className={styles.bar}>
        <span className={styles.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        {filename}
      </figcaption>
      <pre className={styles.code}>
        <code>
          <span className={styles.keyword}>const</span>{' '}
          <span className={styles.variable}>{variable}</span> = {'{'}
          {'\n'}
          {entries.map(([key, value]) => (
            <span key={key}>
              {'  '}
              <span className={styles.property}>{key}</span>: {renderValue(value)},{'\n'}
            </span>
          ))}
          {'}'};{'\n\n'}
          <span className={styles.variable}>{variable}</span>.
          <span className={styles.fn}>build</span>(
          <span className={styles.string}>&apos;something awesome&apos;</span>);
        </code>
      </pre>
    </figure>
  );
}
