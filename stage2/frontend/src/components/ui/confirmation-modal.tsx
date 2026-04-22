'use client';

import React, { useEffect } from 'react';
import Button from './button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message
}: ConfirmationModalProps) {
  
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[rgba(0,0,0,0.5)]">
      <div 
        className="bg-white dark:bg-secondary-dark w-full max-w-[480px] p-8 md:p-12 rounded-lg shadow-2xl transition-all animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl md:text-2xl font-bold text-text-dark dark:text-white mb-3 tracking-[-0.5px]">
          {title}
        </h2>
        
        <p className="text-sm font-medium leading-[22px] text-text-gray dark:text-text-gray-light mb-8">
          {message}
        </p>

        <div className="flex items-center justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
