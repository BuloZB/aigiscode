import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { List, X, Moon, Sun, GithubLogo, Globe, ShieldCheck } from '@phosphor-icons/react';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'cs', label: 'CS' },
  { code: 'fr', label: 'FR' },
  { code: 'es', label: 'ES' },
];

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navLinks = [
    { href: '#features', label: t('nav.features') },
    { href: '#how-it-works', label: t('nav.howItWorks') },
    { href: '#languages', label: t('nav.languages') },
    { href: 'https://github.com/david-strejc/aigiscode', label: 'GitHub', external: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-[#030303]/70 border-b border-zinc-200/50 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 font-display font-bold text-xl tracking-tighter">
            <ShieldCheck size={28} className="text-indigo-500" weight="duotone" />
            <span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Aigis</span>
              <span className="text-zinc-900 dark:text-white">Code</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1"
              >
                {link.label === 'GitHub' && <GithubLogo size={16} weight="bold" />}
                {link.label}
              </a>
            ))}

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <Globe size={16} />
                {i18n.language?.toUpperCase().slice(0, 2) || 'EN'}
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="absolute right-0 mt-2 py-1 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-white/10 min-w-[60px]"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { i18n.changeLanguage(lang.code); setLangOpen(false); }}
                        className={`block w-full px-3 py-1.5 text-sm text-left hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors ${
                          i18n.language?.startsWith(lang.code) ? 'text-indigo-500 font-medium' : 'text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors text-zinc-600 dark:text-zinc-400"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* CTA */}
            <a
              href="#get-started"
              className="px-4 py-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:scale-105 transition-transform"
            >
              {t('nav.getStarted')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-zinc-200/50 dark:border-white/5 bg-white/90 dark:bg-[#030303]/90 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-2 pt-2 border-t border-zinc-200/50 dark:border-white/5">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { i18n.changeLanguage(lang.code); setMobileOpen(false); }}
                    className={`px-2 py-1 text-xs rounded ${
                      i18n.language?.startsWith(lang.code)
                        ? 'bg-indigo-500/10 text-indigo-500 font-medium'
                        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
                <button onClick={toggleTheme} className="ml-auto p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5">
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
