import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import { generateAboutMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import AboutPageClient from './AboutPageClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';
  const t = await getTranslations({ locale: validLocale, namespace: 'metadata' });

  return generateAboutMetadata(validLocale, {
    title: t('about.title'),
    description: t('about.description'),
  });
}

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';

  // Enable static rendering
  setRequestLocale(locale);

  const tCommon = await getTranslations({ locale: validLocale, namespace: 'common' });
  const tAbout = await getTranslations({ locale: validLocale, namespace: 'aboutPage' });

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: tCommon('home') || 'Home', path: '' },
      { name: tAbout('title') || 'About', path: '/about' },
    ],
    validLocale
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <AboutPageClient locale={validLocale} />
    </>
  );
}
