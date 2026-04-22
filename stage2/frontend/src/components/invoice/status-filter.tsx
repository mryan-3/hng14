'use client';

import { useState } from 'react';

const STATUSES = ['Draft', 'Pending', 'Paid'];

interface StatusFilterProps {
  selectedStatuses: string[];
  onToggle: (status: string) => void;
}

export default function StatusFilter({ selectedStatuses, onToggle }: StatusFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 md:gap-4 group cursor-pointer"
      >
        <span className="text-sm md:text-base font-bold text-text-dark dark:text-white transition-colors">
          Filter <span className="hidden md:inline">by status</span>
        </span>
        <svg 
          width="11" 
          height="7" 
          xmlns="http://www.w3.org/2000/svg" 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-[calc(100%+24px)] left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-0 w-[192px] bg-white dark:bg-secondary-dark-light p-6 rounded-lg shadow-2xl z-20 flex flex-col gap-4">
            {STATUSES.map((status) => {
              const isChecked = selectedStatuses.includes(status.toLowerCase());
              return (
                <label 
                  key={status}
                  className="flex items-center gap-4 cursor-pointer group"
                  onClick={() => onToggle(status.toLowerCase())}
                >
                  <div className={`w-4 h-4 rounded-[2px] flex items-center justify-center transition-all border ${
                    isChecked 
                      ? 'bg-primary-purple border-primary-purple' 
                      : 'bg-[#DFE3FA] dark:bg-sidebar-bg border-transparent group-hover:border-primary-purple'
                  }`}>
                    {isChecked && (
                      <svg width="10" height="8" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 4.5l2.124 2.124L8.964 1" stroke="#FFF" strokeWidth="2" fill="none" fillRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-bold text-text-dark dark:text-white transition-colors">
                    {status}
                  </span>
                </label>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
