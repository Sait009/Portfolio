import { siteConfig } from '@/config/site';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Services from '@/components/sections/Services';
import Stack from '@/components/sections/Stack';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  description: siteConfig.description,
  url: siteConfig.url,
  email: `mailto:${siteConfig.email}`,
  address: { '@type': 'PostalAddress', addressCountry: siteConfig.location },
  sameAs: siteConfig.socials.map((social) => social.href),
};

export default function Home() {
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Hero />
      <About />
      <Services />
      <Stack />
      <Projects />
      <Contact />
    </main>
  );
}
