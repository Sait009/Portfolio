import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';

import { projects, type Project } from '@/data/projects';
import SectionHeading from '@/components/ui/SectionHeading';
import SpotlightCard from '@/components/ui/SpotlightCard';
import styles from './Projects.module.css';

function ProjectCover({ project, index }: { project: Project; index: number }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt=""
        className={styles.image}
        sizes="(max-width: 900px) 100vw, 50vw"
        placeholder="blur"
      />
    );
  }

  // Cover แบบ generative (ใช้จนกว่าจะมีภาพจริง)
  return (
    <div className={styles.generated} aria-hidden="true">
      <span className={styles.chrome}>
        <i />
        <i />
        <i />
      </span>
      <span className={styles.bigIndex}>{String(index + 1).padStart(2, '0')}</span>
      <span className={styles.label}>{project.category}</span>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="section" data-scene="left" aria-labelledby="work-title">
      <div className="container">
        <SectionHeading
          id="work-title"
          index="04"
          eyebrow="Selected work"
          title={
            <>
              Projects I&apos;m <span className="gradient-text">proud of.</span>
            </>
          }
          lead="A selection of client and personal work — from WordPress builds to custom, interactive experiences."
        />

        <ul role="list" className={styles.grid}>
          {projects.map((project, index) => (
            <li key={project.slug} data-reveal>
              <SpotlightCard
                tilt
                className={styles.card}
                style={{ '--card-accent': `var(--${project.accent})` } as CSSProperties}
              >
                <div className={styles.cover}>
                  <ProjectCover project={project} index={index} />
                </div>

                <div className={styles.body}>
                  <p className={styles.meta}>
                    <span>{project.category}</span>
                    <span aria-hidden="true">/</span>
                    <span>{project.year}</span>
                  </p>
                  <h3 className={styles.title}>
                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.stretched}
                      >
                        {project.title}
                        <ArrowUpRight size={20} aria-hidden />
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <p className={styles.summary}>{project.summary}</p>
                  <ul role="list" className={styles.tags} aria-label="Technologies">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.repo}
                    >
                      Source code
                    </a>
                  )}
                </div>
              </SpotlightCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
