import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Noto_Sans_Thai, Space_Grotesk } from 'next/font/google';

import { siteConfig } from '@/config/site';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SceneCanvas from '@/components/three/SceneCanvas';

import '@/styles/tokens.css';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

// ฟอนต์ไทย: ไม่ preload เพราะโหลดเฉพาะตอนมีตัวอักษรไทย (unicode-range)
const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
  variable: '--font-noto-thai',
  display: 'swap',
  preload: false,
});

const title = `${siteConfig.name} — ${siteConfig.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: '#05070d',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${notoSansThai.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SceneCanvas />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
