import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'motion/react';
import { animate, stagger, createTimeline } from 'animejs';
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
import ShieldBackground from '@/components/ShieldBackground';
import ParticleField from '@/components/ParticleField';
import PipelineSVG from '@/components/PipelineSVG';
import { prefersReducedMotion, useCountUp } from '@/hooks/useAnime';

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

/* Terminal lines with embedded numeric targets for count-up animation */
const terminalLines = [
  { text: '$ aigiscode analyze .', color: 'text-zinc-300', delay: 0, numbers: [] as { value: number; label: string }[] },
  { text: '', color: '', delay: 0.15, numbers: [] as { value: number; label: string }[] },
  { text: '  AigisCode v0.1.0', color: 'text-indigo-400', delay: 0.3, numbers: [] as { value: number; label: string }[] },
  { text: '', color: '', delay: 0.35, numbers: [] as { value: number; label: string }[] },
  { text: '  Indexing...     {127} files parsed', color: 'text-zinc-400', delay: 0.5, numbers: [{ value: 127, label: 'files' }] },
  { text: '  Graphing...     {843} dependencies mapped', color: 'text-zinc-400', delay: 0.65, numbers: [{ value: 843, label: 'deps' }] },
  { text: '  Detecting...    dead code, hardwiring', color: 'text-zinc-400', delay: 0.8, numbers: [] as { value: number; label: string }[] },
  { text: '  Reviewing...    AI classifying {23} findings', color: 'text-zinc-400', delay: 0.95, numbers: [{ value: 23, label: 'findings' }] },
  { text: '', color: '', delay: 1.05, numbers: [] as { value: number; label: string }[] },
  { text: '  Results:', color: 'text-emerald-400', delay: 1.15, numbers: [] as { value: number; label: string }[] },
  { text: '  \u251c\u2500\u2500 {3} circular dependencies (strong)', color: 'text-amber-400', delay: 1.3, numbers: [{ value: 3, label: 'circular' }] },
  { text: '  \u251c\u2500\u2500 {12} unused imports', color: 'text-amber-400', delay: 1.45, numbers: [{ value: 12, label: 'unused' }] },
  { text: '  \u251c\u2500\u2500 {5} magic strings', color: 'text-amber-400', delay: 1.6, numbers: [{ value: 5, label: 'magic' }] },
  { text: '  \u2514\u2500\u2500 {3} findings reclassified by AI', color: 'text-emerald-400', delay: 1.75, numbers: [{ value: 3, label: 'reclass' }] },
  { text: '', color: '', delay: 1.85, numbers: [] as { value: number; label: string }[] },
  { text: '  Report: .aigiscode/aigiscode-report.md', color: 'text-zinc-500', delay: 1.95, numbers: [] as { value: number; label: string }[] },
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
      {/* Particle constellation background */}
      <ParticleField count={35} connectionDistance={100} className="opacity-60" />

      {/* Animated shield SVG */}
      <ShieldBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
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
/*  Feature Bento Grid — anime.js stagger wave on scroll                      */
/* -------------------------------------------------------------------------- */

function FeatureCard({ featureKey, Icon, index }: { featureKey: string; Icon: React.ElementType; index: number }) {
  const { t } = useTranslation();

  return (
    <div
      data-feature-card
      className="group relative rounded-2xl border border-zinc-200/50 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] backdrop-blur-xl p-6 overflow-hidden transition-shadow hover:shadow-lg hover:shadow-indigo-500/5 opacity-0"
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
    </div>
  );
}

function FeaturesSection() {
  const { t } = useTranslation();
  const gridRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!gridRef.current || prefersReducedMotion()) {
      // If reduced motion, just show all cards immediately
      if (gridRef.current) {
        gridRef.current.querySelectorAll('[data-feature-card]').forEach((el) => {
          (el as HTMLElement).style.opacity = '1';
        });
      }
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const cards = gridRef.current!.querySelectorAll('[data-feature-card]');
          animate(cards, {
            opacity: [0, 1],
            scale: [0.85, 1],
            translateY: [40, 0],
            duration: 600,
            delay: stagger(80, { grid: [3, 2], from: 'first' }),
            ease: 'outQuart',
          });

          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '-60px' },
    );

    observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

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

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureKeys.map(({ key, Icon }, index) => (
            <FeatureCard key={key} featureKey={key} Icon={Icon} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pipeline / How It Works — with animated SVG connection                    */
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
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-display font-bold text-sm shadow-lg shadow-indigo-500/25 flex-shrink-0 relative z-10">
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

function PipelineSection() {
  const { t } = useTranslation();
  const pipelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(pipelineRef, { once: true, margin: '-100px' });

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

        {/* Desktop: horizontal flow with animated SVG line */}
        <div ref={pipelineRef} className="hidden lg:flex items-start justify-center relative">
          <PipelineSVG stageCount={pipelineStageKeys.length} isInView={isInView} />
          {pipelineStageKeys.map((key, i) => (
            <PipelineStage key={key} stageKey={key} index={i} />
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
/*  Terminal Demo — Typewriter + Counter Animations                           */
/* -------------------------------------------------------------------------- */

/**
 * Renders a single terminal line with character-by-character typewriter.
 * Numbers wrapped in {N} are animated with count-up.
 */
function TypewriterLine({
  line,
  startTime,
}: {
  line: (typeof terminalLines)[number];
  startTime: number;
}) {
  const lineRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!lineRef.current || hasAnimated.current) return;
    if (!line.text) return;

    hasAnimated.current = true;

    if (prefersReducedMotion()) {
      // Just show the text immediately with numbers replaced
      const text = line.text.replace(/\{(\d+)\}/g, '$1');
      lineRef.current.textContent = text;
      return;
    }

    const el = lineRef.current;

    // Parse the text: split on {N} patterns for counter animation
    const parts = line.text.split(/(\{\d+\})/g);
    el.innerHTML = '';

    const spans: HTMLSpanElement[] = [];
    const counterSpans: { span: HTMLSpanElement; target: number }[] = [];

    for (const part of parts) {
      const numMatch = part.match(/^\{(\d+)\}$/);
      if (numMatch) {
        // This is a number to animate
        const span = document.createElement('span');
        span.textContent = '0';
        span.style.opacity = '0';
        span.style.display = 'inline';
        el.appendChild(span);
        spans.push(span);
        counterSpans.push({ span, target: parseInt(numMatch[1], 10) });
      } else {
        // Regular characters — wrap each in a span
        for (const char of part) {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.opacity = '0';
          span.style.display = 'inline';
          el.appendChild(span);
          spans.push(span);
        }
      }
    }

    // Typewriter: reveal characters one by one
    const charDelay = Math.min(30, 600 / Math.max(spans.length, 1));

    const tl = createTimeline({
      autoplay: true,
      delay: startTime,
    });

    // Reveal all character spans
    tl.add(spans, {
      opacity: [0, 1],
      duration: 50,
      delay: stagger(charDelay),
      ease: 'out',
    });

    // After typewriter finishes, count up the numbers
    for (const { span, target } of counterSpans) {
      const obj = { val: 0 };
      // Start counter a bit after the character is revealed
      animate(obj, {
        val: target,
        duration: 800,
        delay: startTime + spans.indexOf(span) * charDelay + 100,
        ease: 'outExpo',
        onUpdate: () => {
          span.textContent = String(Math.round(obj.val));
        },
      });
    }

    return () => {
      tl.pause();
    };
  }, [line.text, startTime]);

  if (!line.text) {
    return <div className={`${line.color} whitespace-pre`}>{'\u00A0'}</div>;
  }

  return (
    <div ref={lineRef} className={`${line.color} whitespace-pre`} />
  );
}

function TerminalCursor({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <span className="inline-block w-[8px] h-[14px] bg-zinc-300 animate-pulse ml-0.5 align-middle" />
  );
}

function TerminalDemo() {
  const termRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(termRef, { once: true, margin: '-100px' });
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShowCursor(true);
      // Hide cursor after all lines have been typed
      const totalTime = terminalLines[terminalLines.length - 1].delay * 1000 + 2000;
      const timer = setTimeout(() => setShowCursor(false), totalTime);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

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
              terminalLines.map((line, i) => (
                <TypewriterLine
                  key={i}
                  line={line}
                  startTime={line.delay * 1000}
                />
              ))}
            {showCursor && (
              <div className="inline-flex items-center">
                <TerminalCursor visible={showCursor} />
              </div>
            )}
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
