import { siteConfig } from '@/config/site';
import CodeWindow, { type CodeEntry } from '@/components/ui/CodeWindow';
import SectionHeading from '@/components/ui/SectionHeading';
import styles from './About.module.css';

const profile: CodeEntry[] = [
  ['name', siteConfig.name],
  ['location', siteConfig.location],
  ['role', siteConfig.role],
  ['stack', ['WordPress', 'Etch', 'ACSS', 'TypeScript']],
  ['learning', 'WebGL shaders'],
  ['availableForWork', siteConfig.availableForWork],
];

export default function About() {
  return (
    <section id="about" className="section" data-scene="right" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          id="about-title"
          index="01"
          eyebrow="About me"
          title={
            <>
              Design-minded developer, <span className="gradient-text">obsessed with details.</span>
            </>
          }
        />

        <div className={styles.grid}>
          <div className={styles.copy} data-reveal>
            <p>
              I&apos;m a web developer based in {siteConfig.location}, building production websites
              on <strong>WordPress</strong> with <strong>Etch</strong> and{' '}
              <strong>Automatic CSS</strong>. I care about clean, semantic markup, scalable design
              systems and interfaces that feel effortless to use.
            </p>
            <p>
              When a project needs more than a page builder, I reach for custom JavaScript,
              TypeScript and modern frameworks — and for the fun stuff, Three.js and shaders to
              bring a brand to life in 3D.
            </p>

            <dl className={styles.stats}>
              {siteConfig.stats.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <dt>{stat.label}</dt>
                  <dd className="gradient-text">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-reveal>
            <CodeWindow filename="developer.ts" variable="developer" entries={profile} />
          </div>
        </div>
      </div>
    </section>
  );
}
