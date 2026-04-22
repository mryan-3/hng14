'use client';

import { useState, useRef, useEffect } from 'react';

interface DatePickerProps {
  label?: string;
  value: string; // e.g. "21 Aug 2021"
  onChange: (date: string) => void;
  className?: string;
}

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export default function DatePicker({ label, value, onChange, className = '' }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parse initial value or default to today
  const [viewDate, setViewDate] = useState(new Date());

  useEffect(() => {
    if (value) {
      const parsed = new Date(value);
      if (!isNaN(parsed.getTime())) {
        setViewDate(parsed);
      }
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeMonth = (offset: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
    setViewDate(newDate);
  };

  const selectDate = (day: number) => {
    const selected = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const dayStr = selected.getDate();
    const monthStr = MONTHS[selected.getMonth()];
    const yearStr = selected.getFullYear();
    onChange(`${dayStr} ${monthStr} ${yearStr}`);
    setIsOpen(false);
  };

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysCount = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());
  const firstDay = getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());
  
  // Padding for previous month days (to start on correct weekday)
  const prevMonthPadding = Array.from({ length: firstDay });
  const days = Array.from({ length: daysCount }, (_, i) => i + 1);

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
        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" className="opacity-50"><path d="M14 2h-.667V.667A.667.667 0 0012.667 0H12a.667.667 0 00-.667.667V2H4.667V.667A.667.667 0 004 0h-.667a.667.667 0 00-.667.667V2H2C.897 2 0 2.897 0 4v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm.667 12c0 .367-.3.667-.667.667H2a.668.668 0 01-.667-.667V7h13.334v7z" fill="#7E88C3" fillRule="nonzero"/></svg>
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-[240px] p-6 bg-white dark:bg-secondary-dark-light shadow-2xl rounded-lg z-20">
          <div className="flex items-center justify-between mb-8">
            <button type="button" onClick={() => changeMonth(-1)} className="text-primary-purple p-1 hover:opacity-70">
              <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg" className="rotate-180"><path d="M1 1l4 4-4 4" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd"/></svg>
            </button>
            <span className="text-sm font-bold text-text-dark dark:text-white">
              {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
            </span>
            <button type="button" onClick={() => changeMonth(1)} className="text-primary-purple p-1 hover:opacity-70">
              <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4 4-4 4" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd"/></svg>
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-y-4 text-center">
            {prevMonthPadding.map((_, i) => <div key={`pad-${i}`} />)}
            {days.map((day) => {
              const isSelected = value === `${day} ${MONTHS[viewDate.getMonth()]} ${viewDate.getFullYear()}`;
              return (
                <button 
                  key={day}
                  type="button"
                  onClick={() => selectDate(day)}
                  className={`text-xs font-bold transition-colors hover:text-primary-purple ${
                    isSelected ? 'text-primary-purple' : 'text-text-dark dark:text-white'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
