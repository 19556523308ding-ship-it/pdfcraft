import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import { generateFaqMetadata, generateFAQPageSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import FAQPageClient from './FAQPageClient';

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

  return generateFaqMetadata(validLocale, {
    title: t('faq.title'),
    description: t('faq.description'),
  });
}

interface FAQPageProps {
  params: Promise<{ locale: string }>;
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';

  // Enable static rendering
  setRequestLocale(locale);

  // Generate localized FAQs for structured data
  const tFaq = await getTranslations({ locale: validLocale, namespace: 'faqPage' });
  const tCommon = await getTranslations({ locale: validLocale, namespace: 'common' });

  const faqKeys = [
    { section: 'general', key: 'whatIs' },
    { section: 'general', key: 'isFree' },
    { section: 'general', key: 'account' },
    { section: 'privacy', key: 'uploaded' },
    { section: 'privacy', key: 'safe' },
    { section: 'privacy', key: 'storage' },
    { section: 'features', key: 'operations' },
    { section: 'features', key: 'merge' },
    { section: 'features', key: 'images' },
    { section: 'features', key: 'edit' },
  ];

  const faqs = faqKeys.map(({ section, key }) => ({
    question: tFaq(`sections.${section}.${key}.question`),
    answer: tFaq(`sections.${section}.${key}.answer`),
  }));

  const faqSchema = generateFAQPageSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: tCommon('home') || 'Home', path: '' },
      { name: tFaq('title') || 'FAQ', path: '/faq' },
    ],
    validLocale
  );

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <FAQPageClient locale={validLocale} />
    </>
  );
}
