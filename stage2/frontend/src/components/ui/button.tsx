'use client';

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'dark' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary-purple hover:bg-primary-purple-light text-white',
  secondary: 'bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] dark:text-[#DFE3FA] hover:bg-[#DFE3FA] dark:hover:bg-white dark:hover:text-[#7E88C3]',
  danger: 'bg-error hover:bg-error-light text-white',
  dark: 'bg-[#373B53] hover:bg-[#0C0E16] text-[#888EB0] dark:text-[#DFE3FA] hover:text-white',
  ghost: 'bg-[#F9FAFE] dark:bg-secondary-dark-light text-[#7C5DFA] hover:bg-text-gray-light dark:hover:bg-sidebar-bg',
};

export default function Button({ 
  variant = 'primary', 
  className = '', 
  children, 
  ...props 
}: ButtonProps) {
  return (
    <button
      className={`px-4 md:px-6 py-4 rounded-[24px] font-bold text-xs md:text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
