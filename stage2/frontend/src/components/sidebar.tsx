'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Logo from './ui/logo';
import ThemeToggle from './ui/theme-toggle';
import UserAvatar from './ui/user-avatar';

export default function Sidebar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const currentTheme = theme === 'system' ? resolvedTheme : theme;
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  // Prevent hydration mismatch by not rendering the toggle until mounted
  const currentMode = mounted ? (theme === 'system' ? resolvedTheme : theme) : 'light';

  return (
    <aside className="fixed top-0 left-0 z-50 flex flex-row items-center justify-between w-full h-[72px] bg-sidebar-bg lg:flex-col lg:w-[103px] lg:h-full lg:rounded-r-[20px] transition-all duration-300">
      <Logo />
      <div className="flex flex-row items-center lg:flex-col lg:w-full lg:justify-end h-full">
        <ThemeToggle theme={(currentMode as 'light' | 'dark')} onToggle={toggleTheme} />
        <div className="w-px h-full bg-[#494E6E] lg:w-full lg:h-px" />
        <UserAvatar />
      </div>
    </aside>
  );
}
