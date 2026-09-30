import type { Metadata } from 'next';
import Link from 'next/link';

import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <main id="main" className={styles.main} data-scene="center">
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>
        <span className="gradient-text">Lost in space.</span>
      </h1>
      <p className={styles.text}>
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link href="/" className={styles.link}>
        ← Back to home
      </Link>
    </main>
  );
}
