import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import type { CSSProperties } from 'react';

import { siteConfig } from '@/config/site';
import Button from '@/components/ui/Button';
import ScrambleText from '@/components/ui/ScrambleText';
import styles from './Hero.module.css';

const stagger = (i: number) => ({ '--i': i }) as CSSProperties;

export default function Hero() {
  const [firstName, ...restName] = siteConfig.name.split(' ');

  return (
    <section className={styles.hero} data-scene="hero" aria-labelledby="hero-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          {siteConfig.availableForWork && (
            <p className={styles.status} style={stagger(0)}>
              <span className={styles.pulse} aria-hidden="true" />
              Available for new projects
            </p>
          )}

          <p className={styles.greeting} style={stagger(1)}>
            <span aria-hidden="true">{'// '}</span>hello, world — I&apos;m
          </p>

          <h1 id="hero-title" className={styles.title} style={stagger(2)}>
            {firstName} <span className="gradient-text">{restName.join(' ')}</span>
          </h1>

          <p className={styles.role} style={stagger(3)}>
            <span className={styles.prompt} aria-hidden="true">
              &gt;
            </span>
            <ScrambleText words={siteConfig.roles} className={styles.scramble} />
            <span className={styles.caret} aria-hidden="true" />
          </p>

          <p className={styles.tagline} style={stagger(4)}>
            {siteConfig.tagline}
          </p>

          <div className={styles.actions} style={stagger(5)}>
            <Button href="#work">
              View my work <ArrowUpRight size={18} aria-hidden />
            </Button>
            <Button href="#contact" variant="ghost">
              Get in touch
            </Button>
          </div>

          <ul role="list" className={styles.meta} style={stagger(6)}>
            <li>
              <MapPin size={16} aria-hidden /> {siteConfig.location}
            </li>
            <li>WordPress · Etch · ACSS</li>
            <li>JS / TS · Three.js</li>
          </ul>
        </div>
      </div>

      <a href="#about" className={styles.scrollCue}>
        <span>Scroll</span>
        <ArrowDown size={16} aria-hidden />
      </a>
    </section>
  );
}
