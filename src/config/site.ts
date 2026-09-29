/**
 * Site configuration
 */
export const siteConfig = {
  name: 'PDFCompress',
  description: 'Professional PDF Tools - Free, Private & Browser-Based. Merge, split, compress, convert, and edit PDF files online without uploading to servers.',
  url: 'https://tool.pdfcompress.online',
  ogImage: '/images/og-image.png',
  links: {
    github: 'https://github.com/19556523308ding-ship-it/pdfcraft',
    mainSite: 'https://pdfcompress.online',
  },
  creator: 'PDFCompress',
  keywords: [
    'PDF tools',
    'PDF editor',
    'merge PDF',
    'split PDF',
    'compress PDF',
    'convert PDF',
    'free PDF tools',
    'online PDF editor',
    'browser-based PDF',
    'private PDF processing',
  ],
  // SEO-related settings
  seo: {
    titleTemplate: '%s | PDFCompress',
    defaultTitle: 'PDFCompress - Professional PDF Tools',
    twitterHandle: '@pdfcompress',
    locale: 'zh_CN',
  },
};

/**
 * Navigation configuration
 */
export const navConfig = {
  mainNav: [
    { title: 'Home', href: '/' },
    { title: 'Tools', href: '/tools' },
    { title: 'About', href: '/about' },
    { title: 'FAQ', href: '/faq' },
  ],
  footerNav: [
    { title: 'Privacy', href: '/privacy' },
    { title: 'Contact', href: '/contact' },
  ],
};
