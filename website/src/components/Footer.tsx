import { useTranslation } from 'react-i18next';
import { GithubLogo, XLogo, ShieldCheck } from '@phosphor-icons/react';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const columns = [
    {
      title: t('footer.product'),
      links: [
        { label: t('footer.features'), href: '#features' },
        { label: t('footer.docs'), href: '#get-started' },
        { label: t('footer.changelog'), href: 'https://github.com/david-strejc/aigiscode/releases' },
      ],
    },
    {
      title: t('footer.community'),
      links: [
        { label: 'GitHub', href: 'https://github.com/david-strejc/aigiscode' },
        { label: t('footer.contributing'), href: 'https://github.com/david-strejc/aigiscode/blob/main/CONTRIBUTING.md' },
        { label: t('footer.issues'), href: 'https://github.com/david-strejc/aigiscode/issues' },
      ],
    },
    {
      title: t('footer.legal'),
      links: [
        { label: t('footer.license'), href: 'https://github.com/david-strejc/aigiscode/blob/main/LICENSE' },
        { label: t('footer.codeOfConduct'), href: 'https://github.com/david-strejc/aigiscode/blob/main/CODE_OF_CONDUCT.md' },
      ],
    },
  ];

  return (
    <footer className="border-t border-zinc-200 dark:border-white/5 bg-white dark:bg-[#030303] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top: Logo + Social */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 font-display font-bold text-2xl tracking-tighter">
              <ShieldCheck size={24} className="text-indigo-500" weight="duotone" />
              <span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Aigis</span>
                <span className="text-zinc-900 dark:text-white">Code</span>
              </span>
            </div>
            <p className="mt-2 text-sm text-zinc-500 max-w-xs">{t('footer.tagline')}</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/david-strejc/aigiscode"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <GithubLogo size={20} weight="bold" />
            </a>
            <a
              href="https://x.com/aigiscode"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
              aria-label="X / Twitter"
            >
              <XLogo size={20} weight="bold" />
            </a>
          </div>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">{col.title}</h4>
              <ul className="space-y-3 text-sm text-zinc-500">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                      {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-zinc-200/50 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400">&copy; {year} AigisCode. {t('footer.rights')}</p>
          <p className="text-xs text-zinc-400 italic">{t('footer.motto')}</p>
        </div>
      </div>
    </footer>
  );
}
