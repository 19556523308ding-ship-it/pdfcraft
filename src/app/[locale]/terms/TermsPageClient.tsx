'use client';

import { useTranslations } from 'next-intl';
import { FileText, Shield, CheckCircle2, AlertCircle, Scale, Globe } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { type Locale } from '@/lib/i18n/config';

interface TermsPageClientProps {
  locale: Locale;
}

export default function TermsPageClient({ locale }: TermsPageClientProps) {
  const t = useTranslations();

  const termHighlights = [
    {
      icon: Shield,
      title: locale === 'zh' ? '100% 本地处理' : '100% Client-Side',
      description: locale === 'zh' 
        ? '所有 PDF 转换与编辑操作均在您的浏览器中完成，文件永不上传服务器。' 
        : 'All PDF processing is executed directly inside your web browser. No files are uploaded to our servers.',
    },
    {
      icon: CheckCircle2,
      title: locale === 'zh' ? '完全拥有您的数据' : 'You Own Your Content',
      description: locale === 'zh'
        ? '您对通过本平台处理的所有文件拥有完整的知识产权与所有权。'
        : 'You retain full ownership, copyright, and control of all files and data processed through our tools.',
    },
    {
      icon: Scale,
      title: locale === 'zh' ? '免费与合规' : 'Free & Fair Use',
      description: locale === 'zh'
        ? '本站所有基础功能全量免费开放，无需注册、无隐藏费用。'
        : 'All tools are completely free to use for personal and commercial purposes without mandatory registration.',
    },
    {
      icon: AlertCircle,
      title: locale === 'zh' ? '服务免责声明' : 'As-Is Service',
      description: locale === 'zh'
        ? '工具按“原样”提供，建议用户在批量处理重要文件前做好本地备份。'
        : 'Tools are provided on an "as-is" basis. We recommend maintaining local backups of critical files.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={locale} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[hsl(var(--color-primary)/0.1)] via-[hsl(var(--color-background))] to-[hsl(var(--color-secondary)/0.1)] py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[hsl(var(--color-foreground))] mb-6">
                {locale === 'zh' ? '服务条款' : 'Terms of Service'}
              </h1>
              <p className="text-lg text-[hsl(var(--color-muted-foreground))]">
                {locale === 'zh' 
                  ? `欢迎使用 ${t('common.brand')}。请阅读我们的服务条款与使用准则。`
                  : `Welcome to ${t('common.brand')}. Please review the terms and conditions governing your use of our tools.`}
              </p>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="py-12 bg-[hsl(var(--color-muted)/0.3)]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {termHighlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="p-6 text-center" hover>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                      <Icon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-[hsl(var(--color-foreground))] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                      {item.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Legal Body */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-8">
                {locale === 'zh' ? '最近更新日期：2026年9月' : 'Last updated: September 2026'}
              </p>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                By accessing or using {t('common.brand')} (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), accessible via 
                <a href="https://tool.pdfcompress.online" className="text-[hsl(var(--color-primary))] underline ml-1">tool.pdfcompress.online</a>, 
                you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may discontinue using our site.
              </p>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">
                2. Description of Service
              </h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                {t('common.brand')} provides browser-based, privacy-first PDF utility tools (including merge, split, compress, convert, OCR, sign, and edit). 
                All document rendering, manipulation, and calculations occur strictly within your client browser environment using WebAssembly and Web Workers. 
                Your files are never transmitted to our remote web servers.
              </p>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">
                3. User Content & Intellectual Property
              </h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                You retain full ownership, intellectual property rights, and responsibility for all documents, images, and texts processed through our tools. 
                We claim zero ownership or rights over your files. Because your files are processed locally on your hardware, we do not view, store, index, or distribute your materials.
              </p>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">
                4. Acceptable Use Policy
              </h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                You agree not to use our service for any unlawful purpose, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[hsl(var(--color-muted-foreground))] mb-4">
                <li>Processing material that infringes third-party intellectual property or copyright without authorization</li>
                <li>Distributing malicious code, exploits, or attempting to compromise browser sandboxes</li>
                <li>Attempting to disrupt or overload our infrastructure with automated denial-of-service abuse</li>
              </ul>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">
                5. Disclaimer of Warranties
              </h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                The software and tools are provided &quot;as is&quot; and &quot;as available&quot;, without warranty of any kind, express or implied. 
                While we continuously test and optimize our algorithms for highest fidelity, we do not warrant that results will be uninterrupted, error-free, or meet every specific business requirement. 
                Users are strongly advised to keep independent local copies of their original documents.
              </p>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                In no event shall {t('common.brand')}, its maintainers, or affiliates be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use this service or loss of document data.
              </p>

              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mt-8 mb-4">
                7. Contact Information
              </h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-4">
                If you have questions regarding these Terms of Service, please contact our support team at:
              </p>
              <p className="text-[hsl(var(--color-primary))] font-semibold">
                <a href="mailto:19556523308ding@gmail.com">19556523308ding@gmail.com</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
