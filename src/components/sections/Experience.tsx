import { ArrowUpRight } from 'lucide-react';

import { awards, education, experience, type TimelineEntry } from '@/data/experience';
import SectionHeading from '@/components/ui/SectionHeading';
import styles from './Experience.module.css';

function Period({ entry }: { entry: TimelineEntry }) {
  // ใส่ dateTime เฉพาะเมื่อมีข้อมูลวันที่ (machine-readable)
  return entry.start ? (
    <time className={styles.period} dateTime={entry.start}>
      {entry.period}
    </time>
  ) : (
    <span className={styles.period}>{entry.period}</span>
  );
}

function Timeline({ title, items }: { title: string; items: TimelineEntry[] }) {
  if (!items.length) return null;

  return (
    <div className={styles.group} data-reveal>
      <h3 className={styles.groupTitle}>{title}</h3>
      <ol role="list" className={styles.timeline}>
        {items.map((entry) => (
          <li
            key={`${entry.title}-${entry.period}`}
            className={styles.item}
            data-current={entry.current || undefined}
          >
            <p className={styles.when}>
              <Period entry={entry} />
              {entry.current && <span className={styles.badge}>Present</span>}
            </p>
            <h4 className={styles.title}>{entry.title}</h4>
            <p className={styles.org}>
              {entry.orgUrl ? (
                <a href={entry.orgUrl} target="_blank" rel="noopener noreferrer">
                  {entry.org}
                  <ArrowUpRight size={14} aria-hidden />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                entry.org
              )}
              {entry.meta && <span className={styles.meta}> · {entry.meta}</span>}
            </p>
            {entry.description && <p className={styles.description}>{entry.description}</p>}
            {entry.highlights && (
              <ul className={styles.highlights}>
                {entry.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
            {entry.tags && (
              <ul role="list" className={styles.tags} aria-label="Technologies">
                {entry.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="section"
      data-scene="right"
      aria-labelledby="experience-title"
    >
      <div className="container">
        <SectionHeading
          id="experience-title"
          index="05"
          eyebrow="Experience & education"
          title={
            <>
              Where I&apos;ve been <span className="gradient-text">building.</span>
            </>
          }
        />

        <div className={styles.grid}>
          <div className={styles.column}>
            <Timeline title="Work experience" items={experience} />
            <Timeline title="Education" items={education} />
          </div>
          <div className={styles.column}>
            <Timeline title="Awards & activities" items={awards} />
          </div>
        </div>
      </div>
    </section>
  );
}
