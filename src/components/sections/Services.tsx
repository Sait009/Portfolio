import { services } from '@/data/skills';
import SectionHeading from '@/components/ui/SectionHeading';
import SpotlightCard from '@/components/ui/SpotlightCard';
import styles from './Services.module.css';

export default function Services() {
  return (
    <section id="services" className="section" data-scene="left" aria-labelledby="services-title">
      <div className="container">
        <SectionHeading
          id="services-title"
          index="02"
          eyebrow="What I do"
          title={
            <>
              From pixel-perfect builds <span className="gradient-text">to custom code.</span>
            </>
          }
          lead="End-to-end web development — with a strong focus on WordPress, performance and memorable interactions."
        />

        <ul role="list" className={styles.grid}>
          {services.map(({ title, description, icon: Icon, points }, index) => (
            <li key={title} data-reveal>
              <SpotlightCard className={styles.card}>
                <div className={styles.top}>
                  <span className={styles.icon}>
                    <Icon size={24} strokeWidth={1.6} aria-hidden />
                  </span>
                  <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
                <ul role="list" className={styles.points}>
                  {points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </SpotlightCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
