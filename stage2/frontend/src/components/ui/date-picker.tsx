'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface DatePickerProps {
  label?: string;
  value: string; // ISO string or simple date string
  onChange: (date: string) => void;
  className?: string;
}

export default function DatePicker({ label, value, onChange, className = '' }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // For this stage, we'll keep it as a UI placeholder that opens a simple display
  // Real calendar logic can be added or we can use a native input if desired,
  // but for "pixel-perfect" a custom one is better.
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative flex flex-col gap-2 ${className}`} ref={containerRef}>
      {label && (
        <label className="text-xs font-medium text-[#7E88C3] dark:text-text-gray-light">
          {label}
        </label>
      )}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-5 py-[14px] bg-white dark:bg-secondary-dark border rounded font-bold text-xs md:text-sm text-text-dark dark:text-white outline-none transition-all hover:border-primary-purple cursor-pointer ${
          isOpen ? 'border-primary-purple' : 'border-text-gray-light dark:border-secondary-dark-light'
        }`}
      >
        <span>{value || 'Select Date'}</span>
        <Image src="/new-invoice.svg" alt="" width={16} height={16} className="opacity-50" />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-[240px] p-6 bg-white dark:bg-secondary-dark-light shadow-2xl rounded-lg z-20">
          <div className="flex items-center justify-between mb-8">
            <button className="text-primary-purple font-bold">{'<'}</button>
            <span className="text-sm font-bold text-text-dark dark:text-white">Aug 2021</span>
            <button className="text-primary-purple font-bold">{'>'}</button>
          </div>
          <div className="grid grid-cols-7 gap-y-4 text-center">
            {/* Simple static calendar for UI demo */}
            {[...Array(31)].map((_, i) => (
              <button 
                key={i}
                onClick={() => {
                  onChange(`${i + 1} Aug 2021`);
                  setIsOpen(false);
                }}
                className={`text-xs font-bold transition-colors ${
                  i + 1 === 21 ? 'text-primary-purple' : 'text-text-dark dark:text-white hover:text-primary-purple'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
