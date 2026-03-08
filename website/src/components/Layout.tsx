import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { IconContext } from '@phosphor-icons/react';

export default function Layout() {
  const [isDark, setIsDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <IconContext.Provider value={{ weight: 'thin' }}>
      <div className="min-h-screen font-sans bg-zinc-50 dark:bg-[#030303] text-zinc-900 dark:text-zinc-50 selection:bg-indigo-500/30 overflow-x-hidden transition-colors duration-500">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg">Skip to main content</a>

        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 dark:bg-indigo-500/10 blur-[120px] mix-blend-screen" />
          <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-violet-500/20 dark:bg-violet-500/10 blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-blue-500/20 dark:bg-blue-500/10 blur-[120px] mix-blend-screen" />
        </div>

        <main id="main-content" className="relative z-10">
          <Outlet context={{ isDark, toggleTheme }} />
        </main>
      </div>
    </IconContext.Provider>
  );
}
