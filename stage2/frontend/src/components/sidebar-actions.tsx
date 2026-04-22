'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function SidebarActions() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;

    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="flex flex-row items-center lg:flex-col lg:w-full lg:pb-6">
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center w-20 h-20 transition-colors hover:text-white group lg:w-full"
        aria-label="Toggle Theme"
      >
        {theme === 'light' ? (
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" className="fill-[#7E88C3] group-hover:fill-[#DFE3FA] transition-colors">
            <path d="M6.224 10.503L.367 15.89l.021.018c.556.516 1.453.477 1.96-.088l5.858-6.524a1 1 0 00-.141-1.407L6.224 10.503zm1.85 2.13l1.528 1.528a1 1 0 101.415-1.414l-1.528-1.528a1 1 0 10-1.415 1.414zm9.559-9.558l-1.528-1.528a1 1 0 00-1.415 1.414l1.528 1.528a1 1 0 001.415-1.414zm-1.85-2.131L9.926 6.812a1 1 0 101.548 1.265l5.857-7.169a1 1 0 00-1.548-1.265zM1.623 3.909l5.857 7.168a1 1 0 001.548-1.265L3.17 1.265A1 1 0 001.623 3.909zM.555 5.516c.556.516 1.453.477 1.96-.088l5.858-6.524a1 1 0 00-.141-1.407L.555 5.516zm18.525 8.016l-5.857 7.169a1 1 0 001.548 1.265l5.857-7.169a1 1 0 00-1.548-1.265zM10.503 6.224L5.116.367l-.018.021a1.404 1.404 0 00.088 1.96l6.524 5.858a1 1 0 001.407-.141l-2.614-1.841zm2.13 1.85l1.528 1.528a1 1 0 001.414-1.415l-1.528-1.528a1 1 0 00-1.414 1.415zm-9.558 9.559l-1.528-1.528a1 1 0 001.414-1.415l1.528 1.528a1 1 0 00-1.414 1.415zm-2.131-1.85L6.812 9.926a1 1 0 101.265 1.548l-7.169 5.857a1 1 0 00-1.265-1.548zM3.909 1.623l7.168 5.857a1 1 0 10-1.265 1.548L1.265 3.17A1 1 0 103.909 1.623zM5.516.555a1.404 1.404 0 00-.088 1.96l6.524 5.858a1 1 0 101.407-.141L5.516.555zm8.016 18.525l7.169-5.857a1 1 0 101.265-1.548l-7.169 5.857a1 1 0 10-1.265 1.548z" />
          </svg>
        ) : (
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" className="fill-[#7E88C3] group-hover:fill-[#DFE3FA] transition-colors">
            <path d="M19.502 11.342a.703.703 0 00-.588-.128 7.499 7.499 0 01-2.27.354c-4.108 0-7.44-3.332-7.44-7.441 0-1.638.52-3.146 1.412-4.366a.701.701 0 00-.206-1.02.7.7 0 00-.298-.07c-6.181 0-11.202 5.02-11.202 11.202 0 6.18 5.021 11.202 11.202 11.202 5.944 0 10.803-4.637 11.175-10.433a.704.704 0 00-.785-.799z" fillRule="nonzero" />
          </svg>
        )}
      </button>

      <div className="w-[1px] h-20 bg-[#494E6E] lg:w-full lg:h-[1px]" />

      <div className="flex items-center justify-center w-20 h-20 lg:w-full lg:h-[103px] lg:mt-2">
        <div className="relative w-8 h-8 rounded-full overflow-hidden lg:w-10 lg:h-10 border border-transparent hover:border-primary-purple transition-colors cursor-pointer">
          <Image
            src="/vercel.svg"
            alt="User Avatar"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
