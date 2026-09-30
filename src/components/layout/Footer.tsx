import { ArrowUp } from 'lucide-react';

import { siteConfig } from '@/config/site';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <p className={styles.built}>
          Built with <span>Next.js</span> + <span>Three.js</span>
        </p>
        <a href="#main" className={styles.top}>
          Back to top <ArrowUp size={14} aria-hidden />
        </a>
      </div>
    </footer>
  );
}
