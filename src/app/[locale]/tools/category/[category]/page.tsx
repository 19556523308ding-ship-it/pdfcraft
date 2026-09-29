import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import { TOOL_CATEGORIES, type ToolCategory } from '@/types/tool';
import { generateBreadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/config/site';
import CategoryPageClient from './CategoryPageClient';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
    return locales.flatMap((locale) =>
        TOOL_CATEGORIES.map((category) => ({
            locale,
            category,
        }))
    );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string }> }) {
    const { category } = await params;

    const formattedCategory = category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return {
        title: `${formattedCategory} Tools - ${siteConfig.name}`,
        description: `Free online ${formattedCategory} tools. Secure, fast, and easy to use.`,
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ locale: string; category: string }> }) {
    const { locale, category } = await params;
    const validLocale = locale as Locale;

    // Validate category
    if (!TOOL_CATEGORIES.includes(category as ToolCategory)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Get localized content for tools
    const { tools } = await import('@/config/tools');
    const { getToolContent } = await import('@/config/tool-content');

    const localizedToolContent = tools.reduce((acc, tool) => {
        const content = getToolContent(validLocale, tool.id);
        if (content) {
            acc[tool.id] = {
                title: content.title,
                description: content.metaDescription
            };
        }
        return acc;
    }, {} as Record<string, { title: string; description: string }>);

    const tCommon = await getTranslations({ locale: validLocale, namespace: 'common' });
    const tNav = await getTranslations({ locale: validLocale, namespace: 'nav' });

    const formattedCategory = category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    const breadcrumbSchema = generateBreadcrumbSchema(
        [
            { name: tCommon('home') || 'Home', path: '' },
            { name: tNav('tools') || 'Tools', path: '/tools' },
            { name: formattedCategory, path: `/tools/category/${category}` },
        ],
        validLocale
    );

    return (
        <>
            <JsonLd data={breadcrumbSchema} />
            <CategoryPageClient
                locale={validLocale}
                category={category as ToolCategory}
                localizedToolContent={localizedToolContent}
            />
        </>
    );
}
