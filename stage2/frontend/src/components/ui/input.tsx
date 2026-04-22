'use client';

import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  error?: boolean;
}

export function Label({ children, error, className = '', ...props }: LabelProps) {
  return (
    <label 
      className={`block text-xs font-medium mb-2 transition-colors ${
        error ? 'text-error' : 'text-text-blue-gray dark:text-text-gray-light'
      } ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ error, className = '', ...props }: InputProps) {
  return (
    <input
      suppressHydrationWarning
      className={`w-full px-5 py-[14px] bg-white dark:bg-secondary-dark border rounded font-bold text-xs md:text-sm text-text-dark dark:text-white outline-none transition-all hover:border-primary-purple focus:border-primary-purple ${
        error 
          ? 'border-error focus:border-error' 
          : 'border-text-gray-light dark:border-secondary-dark-light'
      } ${className}`}
      {...props}
    />
  );
}

export function Select({ error, className = '', children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  return (
    <select
      className={`w-full px-5 py-[14px] bg-white dark:bg-secondary-dark border rounded font-bold text-xs md:text-sm text-text-dark dark:text-white outline-none transition-all focus:border-primary-purple appearance-none cursor-pointer ${
        error 
          ? 'border-error focus:border-error' 
          : 'border-text-gray-light dark:border-secondary-dark-light'
      } ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
