import { siteConfig } from '@/config/site';
import { education } from '@/data/experience';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Experience from '@/components/sections/Experience';
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
  alumniOf: education.map((entry) => ({ '@type': 'CollegeOrUniversity', name: entry.org })),
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
      <Experience />
      <Contact />
    </main>
  );
}
