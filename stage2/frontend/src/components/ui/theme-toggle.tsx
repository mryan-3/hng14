'use client';

import Image from 'next/image';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button 
      onClick={onToggle}
      className="flex items-center justify-center w-20 h-20 transition-colors hover:text-white group lg:w-full"
      aria-label="Toggle Theme"
    >
      <div className="relative w-5 h-5">
        <Image 
          src={theme === 'light' ? '/dark-theme-icon.svg' : '/light-mode.svg'} 
          alt={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          fill
          className="object-contain transition-opacity duration-300"
        />
      </div>
    </button>
  );
}
