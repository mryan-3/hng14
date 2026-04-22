'use client';

import Image from 'next/image';

export interface HomeHeaderProps {
  count: number;
  onNewInvoice: () => void;
  selectedStatuses: string[];
  onToggleStatus: (status: string) => void;
}

import StatusFilter from './status-filter';

export default function HomeHeader({ count, onNewInvoice, selectedStatuses, onToggleStatus }: HomeHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl md:text-[32px] font-bold tracking-[-0.63px] md:tracking-[-1px] text-text-dark dark:text-white transition-colors">
          Invoices
        </h1>
        <p className="text-sm font-medium text-text-gray dark:text-text-gray-light mt-1 md:mt-2">
          {count === 0 ? 'no invoices' : (
            <span className="flex gap-1">
              <span className="hidden md:inline">There are</span>
              {count}
              <span className="hidden md:inline">total</span>
              invoices
            </span>
          )}
        </p>
      </div>

      <div className="flex items-center gap-4 md:gap-10">
        <StatusFilter selectedStatuses={selectedStatuses} onToggle={onToggleStatus} />

        <button 
          onClick={onNewInvoice} 
          className="flex items-center p-1.5 md:p-2 bg-primary-purple hover:bg-primary-purple-light text-white rounded-[24px] transition-colors group"
        >
          <div className="relative w-8 h-8">
            <Image 
              src="/new-invoice.svg" 
              alt="" 
              fill
              className="object-contain"
            />
          </div>
          <span className="ml-2 mr-3 md:ml-4 md:mr-6 text-sm md:text-base font-bold">
            New <span className="hidden md:inline">Invoice</span>
          </span>
        </button>
      </div>
    </header>
  );
}
