import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'motion/react';
import {
  ArrowsClockwise,
  Trash,
  LinkBreak,
  Robot,
  Sliders,
  Code,
  Copy,
  Check,
  ArrowRight,
  GithubLogo,
} from '@phosphor-icons/react';

/* -------------------------------------------------------------------------- */
/*  Constants                                                                 */
/* -------------------------------------------------------------------------- */

const featureKeys = [
  { key: 'circular', Icon: ArrowsClockwise },
  { key: 'deadCode', Icon: Trash },
  { key: 'hardwiring', Icon: LinkBreak },
  { key: 'aiReview', Icon: Robot },
  { key: 'policy', Icon: Sliders },
  { key: 'multiLang', Icon: Code },
] as const;

const pipelineStageKeys = ['index', 'graph', 'detect', 'rules', 'review', 'report'] as const;

const supportedLanguages = ['PHP', 'Python', 'TypeScript', 'JavaScript', 'Vue'];

const terminalLines = [
  { text: '$ aigiscode analyze .', color: 'text-zinc-300', delay: 0 },
  { text: '', color: '', delay: 0.15 },
  { text: '  AigisCode v0.1.0', color: 'text-indigo-400', delay: 0.3 },
  { text: '', color: '', delay: 0.35 },
  { text: '  Indexing...     127 files parsed', color: 'text-zinc-400', delay: 0.5 },
  { text: '  Graphing...     843 dependencies mapped', color: 'text-zinc-400', delay: 0.65 },
  { text: '  Detecting...    dead code, hardwiring', color: 'text-zinc-400', delay: 0.8 },
  { text: '  Reviewing...    AI classifying 23 findings', color: 'text-zinc-400', delay: 0.95 },
  { text: '', color: '', delay: 1.05 },
  { text: '  Results:', color: 'text-emerald-400', delay: 1.15 },
  { text: '  \u251c\u2500\u2500 3 circular dependencies (strong)', color: 'text-amber-400', delay: 1.3 },
  { text: '  \u251c\u2500\u2500 12 unused imports', color: 'text-amber-400', delay: 1.45 },
  { text: '  \u251c\u2500\u2500 5 magic strings', color: 'text-amber-400', delay: 1.6 },
  { text: '  \u2514\u2500\u2500 3 findings reclassified by AI', color: 'text-emerald-400', delay: 1.75 },
  { text: '', color: '', delay: 1.85 },
  { text: '  Report: .aigiscode/aigiscode-report.md', color: 'text-zinc-500', delay: 1.95 },
];

/* -------------------------------------------------------------------------- */
/*  Hero Section                                                              */
/* -------------------------------------------------------------------------- */

function HeroSection() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('pip install aigiscode');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <section className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-display font-bold tracking-tighter leading-[1.05]"
        >
          {t('hero.title1')}{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            {t('hero.title2')}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#get-started"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-semibold hover:scale-105 active:scale-[0.98] transition-transform shadow-lg shadow-zinc-900/20 dark:shadow-white/10"
          >
            {t('hero.cta1')}
            <ArrowRight size={16} weight="bold" />
          </a>
          <a
            href="https://github.com/AigisCode/AigisCode"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-zinc-300 dark:border-white/10 text-zinc-700 dark:text-zinc-300 text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
          >
            <GithubLogo size={18} weight="bold" />
            {t('hero.cta2')}
          </a>
        </motion.div>

        {/* Install Command */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 inline-flex items-center gap-3 bg-zinc-900 dark:bg-zinc-800/80 text-zinc-300 rounded-xl px-5 py-3 font-mono text-sm border border-zinc-800 dark:border-zinc-700/50"
        >
          <span className="text-zinc-500 select-none">$</span>
          <span className="select-all">{t('hero.install')}</span>
          <button
            onClick={handleCopy}
            className="ml-1 p-1 rounded hover:bg-white/10 transition-colors"
            aria-label="Copy install command"
          >
            {copied ? (
              <Check size={16} className="text-emerald-400" weight="bold" />
            ) : (
              <Copy size={16} className="text-zinc-500" />
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Trusted Languages Bar                                                     */
/* -------------------------------------------------------------------------- */

function TrustedBar() {
  const { t } = useTranslation();

  return (
    <section className="relative py-12 md:py-16" aria-label={t('trustedBy.title')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium mb-6">
            {t('trustedBy.title')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {supportedLanguages.map((lang, i) => (
              <motion.span
                key={lang}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="px-5 py-2 rounded-full bg-white/60 dark:bg-white/5 border border-zinc-200/60 dark:border-white/5 font-mono text-sm text-zinc-600 dark:text-zinc-400 backdrop-blur-sm"
              >
                {lang}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Feature Bento Grid                                                        */
/* -------------------------------------------------------------------------- */

function FeatureCard({ featureKey, Icon, index }: { featureKey: string; Icon: React.ElementType; index: number }) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl border border-zinc-200/50 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] backdrop-blur-xl p-6 overflow-hidden transition-shadow hover:shadow-lg hover:shadow-indigo-500/5"
    >
      {/* Hover glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />

      <div className="relative">
        <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 text-indigo-500">
          <Icon size={24} weight="duotone" />
        </div>
        <h3 className="font-display font-semibold text-lg mb-2 text-zinc-900 dark:text-white">
          {t(`features.${featureKey}.title`)}
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {t(`features.${featureKey}.description`)}
        </p>
      </div>
    </motion.div>
  );
}

function FeaturesSection() {
  const { t } = useTranslation();

  return (
    <section id="features" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-zinc-900 dark:text-white">
            {t('features.title')}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureKeys.map(({ key, Icon }, index) => (
            <FeatureCard key={key} featureKey={key} Icon={Icon} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pipeline / How It Works                                                   */
/* -------------------------------------------------------------------------- */

function PipelineStage({ stageKey, index }: { stageKey: string; index: number }) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="flex flex-col items-center text-center flex-1 min-w-0"
    >
      {/* Number circle */}
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-display font-bold text-sm shadow-lg shadow-indigo-500/25 flex-shrink-0">
        {index + 1}
      </div>
      <h3 className="mt-4 font-display font-semibold text-zinc-900 dark:text-white text-sm md:text-base">
        {t(`pipeline.stages.${stageKey}.title`)}
      </h3>
      <p className="mt-1 text-xs md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[160px]">
        {t(`pipeline.stages.${stageKey}.description`)}
      </p>
    </motion.div>
  );
}

function PipelineConnector({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.12 + 0.06 }}
      className="hidden lg:flex items-start pt-6 flex-shrink-0"
      aria-hidden="true"
    >
      <div className="w-8 xl:w-12 h-px bg-gradient-to-r from-indigo-500/40 to-purple-500/40" />
    </motion.div>
  );
}

function PipelineSection() {
  const { t } = useTranslation();

  return (
    <section id="how-it-works" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-zinc-900 dark:text-white">
            {t('pipeline.title')}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {t('pipeline.subtitle')}
          </p>
        </motion.div>

        {/* Desktop: horizontal flow */}
        <div className="hidden lg:flex items-start justify-center">
          {pipelineStageKeys.map((key, i) => (
            <div key={key} className="contents">
              <PipelineStage stageKey={key} index={i} />
              {i < pipelineStageKeys.length - 1 && <PipelineConnector index={i} />}
            </div>
          ))}
        </div>

        {/* Mobile / Tablet: vertical list */}
        <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-8">
          {pipelineStageKeys.map((key, i) => (
            <PipelineStage key={key} stageKey={key} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Terminal Demo                                                             */
/* -------------------------------------------------------------------------- */

function TerminalLine({ line, index }: { line: (typeof terminalLines)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: line.delay }}
      className={`${line.color} whitespace-pre`}
    >
      {line.text || '\u00A0'}
    </motion.div>
  );
}

function TerminalDemo() {
  const termRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(termRef, { once: true, margin: '-100px' });

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={termRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-zinc-900 dark:bg-zinc-950 border border-zinc-800 dark:border-zinc-800/60 shadow-2xl shadow-black/20 overflow-hidden"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-zinc-800 dark:border-zinc-800/60">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-3 text-xs text-zinc-500 font-mono">terminal</span>
          </div>

          {/* Terminal content */}
          <div className="p-5 md:p-6 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
            {isInView &&
              terminalLines.map((line, i) => <TerminalLine key={i} line={line} index={i} />)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  CTA Section                                                               */
/* -------------------------------------------------------------------------- */

function CtaSection() {
  const { t } = useTranslation();

  return (
    <section id="get-started" className="py-20 md:py-32 bg-zinc-900 dark:bg-zinc-950 text-white relative overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-indigo-500/30 via-purple-500/20 to-pink-500/30 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight">
            {t('cta.title')}
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="mt-10 relative inline-block">
            {/* Button glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-60" aria-hidden="true" />
            <a
              href="https://github.com/AigisCode/AigisCode"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-sm hover:scale-105 active:scale-[0.98] transition-transform shadow-xl"
            >
              {t('cta.button')}
              <ArrowRight size={16} weight="bold" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  HomePage                                                                  */
/* -------------------------------------------------------------------------- */

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedBar />
      <FeaturesSection />
      <PipelineSection />
      <TerminalDemo />
      <CtaSection />
    </>
  );
}
