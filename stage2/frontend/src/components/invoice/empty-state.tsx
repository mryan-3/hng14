'use client';

import Image from 'next/image';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 lg:py-36 text-center">
      <div className="relative w-[193px] h-[160px] md:w-[242px] md:h-[200px] mb-10 md:mb-16">
        <Image 
          src="/no-invoices.svg" 
          alt="No invoices" 
          fill 
          className="object-contain"
          priority
        />
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-text-dark dark:text-white mb-6 tracking-[-0.63px]">
        There is nothing here
      </h2>
      <p className="text-sm font-medium text-text-gray dark:text-text-gray-light max-w-[220px] leading-4 md:leading-4.5">
        Create an invoice by clicking the <span className="font-bold">New Invoice</span> button and get started
      </p>
    </div>
  );
}
