import { marqueeItems, skillGroups } from '@/data/skills';
import SectionHeading from '@/components/ui/SectionHeading';
import styles from './Stack.module.css';

export default function Stack() {
  return (
    <section id="stack" className="section" data-scene="right" aria-labelledby="stack-title">
      <div className="container">
        <SectionHeading
          id="stack-title"
          index="03"
          eyebrow="Tech stack"
          title={
            <>
              Tools I use <span className="gradient-text">to ship fast.</span>
            </>
          }
        />

        <div className={styles.groups}>
          {skillGroups.map((group) => (
            <div key={group.title} className={styles.group} data-reveal>
              <h3 className={styles.groupTitle}>
                <span aria-hidden="true">~/</span>
                {group.title}
              </h3>
              <ul role="list" className={styles.chips}>
                {group.items.map((item) => (
                  <li key={item} className={styles.chip}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* แถบวิ่ง (ตกแต่ง) — ชุดที่สองซ้ำเพื่อให้ loop ต่อเนื่อง จึงซ่อนจาก screen reader */}
      <div className={styles.marquee} aria-hidden="true">
        {[0, 1].map((copy) => (
          <ul key={copy} className={styles.track}>
            {marqueeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
