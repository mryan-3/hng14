'use client';

import { useState, useEffect } from 'react';
import Logo from './ui/logo';
import ThemeToggle from './ui/theme-toggle';
import UserAvatar from './ui/user-avatar';

export default function Sidebar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    if (initialTheme === 'dark') document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <aside className="fixed top-0 left-0 z-50 flex flex-row items-center justify-between w-full h-20 bg-sidebar-bg lg:flex-col lg:w-[103px] lg:h-full lg:rounded-r-[20px] transition-all duration-300">
      <Logo />
      <div className="flex flex-row items-center lg:flex-col lg:w-full lg:pb-6">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
        <div className="w-[1px] h-20 bg-[#494E6E] lg:w-full lg:h-[1px]" />
        <UserAvatar />
      </div>
    </aside>
  );
}
