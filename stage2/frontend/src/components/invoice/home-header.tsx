'use client';

import Image from 'next/image';

export interface HomeHeaderProps {
  count: number;
  onNewInvoice: () => void;
}

export default function HomeHeader({ count, onNewInvoice }: HomeHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl md:text-[32px] font-bold tracking-[-0.63px] md:tracking-[-1px] text-text-dark dark:text-white transition-colors">
          Invoices
        </h1>
        <p className="text-sm font-medium text-text-gray dark:text-text-gray-light mt-1 md:mt-2">
          <span className="hidden md:inline">There are </span>
          {count === 0 ? 'no invoices' : `${count} total invoices`}
        </p>
      </div>

      <div className="flex items-center gap-4 md:gap-10">
        {/* Filter Dropdown */}
        <button className="flex items-center gap-3 md:gap-4 group cursor-pointer">
          <span className="text-sm md:text-base font-bold text-text-dark dark:text-white transition-colors">
            Filter <span className="hidden md:inline">by status</span>
          </span>
          <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg" className="group-hover:rotate-180 transition-transform duration-300">
            <path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd" />
          </svg>
        </button>

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
