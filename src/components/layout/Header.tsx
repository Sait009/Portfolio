'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { navItems, siteConfig, type SectionId } from '@/config/site';
import styles from './Header.module.css';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);

  // ไฮไลต์เมนูตาม section ที่อยู่กลางจอ
  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // ปิดเมนูด้วย Escape + ล็อก scroll ตอนเปิดเมนูบนมือถือ
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const root = document.documentElement;
    root.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      root.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <header className={styles.header} data-open={open || undefined}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label={`${siteConfig.name} — home`}>
          <span className={styles.logoBracket}>&lt;</span>
          {siteConfig.handle}
          <span className={styles.logoBracket}>/&gt;</span>
        </Link>

        <nav id="site-nav" className={styles.nav} aria-label="Primary">
          <ul role="list" className={styles.list}>
            {navItems.map(({ id, label }, index) => (
              <li key={id}>
                <Link
                  href={`/#${id}`}
                  className={styles.link}
                  aria-current={active === id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a className={styles.cta} href={`mailto:${siteConfig.email}`}>
          Let&apos;s talk
        </a>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
        </button>
      </div>
    </header>
  );
}
