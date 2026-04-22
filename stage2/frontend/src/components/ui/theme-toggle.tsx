'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button 
      onClick={onToggle}
      className="flex items-center justify-center w-[72px] h-full transition-colors hover:text-white group lg:w-full lg:h-20"
      aria-label="Toggle Theme"
    >
      <div className="relative w-5 h-5">
        {mounted && (
          <Image 
            src={theme === 'light' ? '/dark-theme-icon.svg' : '/light-mode.svg'} 
            alt={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            fill
            className="object-contain transition-opacity duration-300"
          />
        )}
      </div>
    </button>
  );
}
