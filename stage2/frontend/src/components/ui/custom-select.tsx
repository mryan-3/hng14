'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Option {
  label: string;
  value: string | number;
}

interface CustomSelectProps {
  label?: string;
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  className?: string;
}

export default function CustomSelect({ label, options, value, onChange, className = '' }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find(opt => opt.value === value);

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
        <span>{selectedOption?.label || value}</span>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4.223 4.223L9.446 1" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd"/></svg>
        </div>
      </button>

      {isOpen && (
        <ul className="absolute top-[calc(100%+8px)] left-0 w-full bg-white dark:bg-secondary-dark-light shadow-2xl rounded-lg overflow-hidden z-20">
          {options.map((option) => (
            <li 
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`px-6 py-4 text-xs md:text-sm font-bold border-b border-text-gray-light dark:border-secondary-dark last:border-b-0 cursor-pointer transition-colors ${
                option.value === value 
                  ? 'text-primary-purple' 
                  : 'text-text-dark dark:text-text-gray-light hover:text-primary-purple'
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
