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
        error ? 'text-error' : 'text-[#7E88C3] dark:text-text-gray-light'
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
      className={`w-full px-5 py-4 bg-white dark:bg-secondary-dark border rounded font-bold text-xs md:text-sm text-text-dark dark:text-white outline-none transition-all focus:border-primary-purple ${
        error 
          ? 'border-error focus:border-error' 
          : 'border-[#DFE3FA] dark:border-[#252945]'
      } ${className}`}
      {...props}
    />
  );
}

export function Select({ error, className = '', children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  return (
    <select
      className={`w-full px-5 py-4 bg-white dark:bg-secondary-dark border rounded font-bold text-xs md:text-sm text-text-dark dark:text-white outline-none transition-all focus:border-primary-purple appearance-none cursor-pointer ${
        error 
          ? 'border-error focus:border-error' 
          : 'border-[#DFE3FA] dark:border-[#252945]'
      } ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
