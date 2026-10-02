import { ArrowUpRight, Mail } from 'lucide-react';

import { siteConfig } from '@/config/site';
import Button from '@/components/ui/Button';
import ContactForm from '@/components/ui/ContactForm';
import CopyEmailButton from '@/components/ui/CopyEmailButton';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section
      id="contact"
      className={`section ${styles.contact}`}
      data-scene="center"
      aria-labelledby="contact-title"
    >
      <div className={`container ${styles.inner}`}>
        <div className={styles.intro} data-reveal>
          <p className={styles.eyebrow}>
            <span>06</span> — Contact
          </p>
          <h2 id="contact-title" className={styles.title}>
            Have a project in mind?{' '}
            <span className="gradient-text">Let&apos;s build it together.</span>
          </h2>
          <p className={styles.lead}>
            Open for freelance projects, collaborations and full-time opportunities. Send a message
            and I&apos;ll reply within 24 hours.
          </p>

          <div className={styles.actions}>
            <Button href={`mailto:${siteConfig.email}`} variant="ghost">
              <Mail size={18} aria-hidden /> {siteConfig.email}
            </Button>
            <CopyEmailButton email={siteConfig.email} className={styles.copy} />
          </div>

          {siteConfig.socials.length > 0 && (
            <ul role="list" className={styles.socials}>
              {siteConfig.socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer me">
                    {social.label}
                    <ArrowUpRight size={16} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div data-reveal>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
