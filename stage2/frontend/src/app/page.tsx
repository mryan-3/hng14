'use client';

import { useState } from 'react';
import InvoiceCard, { InvoiceCardProps } from '@/components/invoice-card';
import InvoiceForm from '@/components/invoice-form';
import Image from 'next/image';

const MOCK_INVOICES: (InvoiceCardProps)[] = [
  { id: 'RT3080', dueDate: '19 Aug 2021', clientName: 'Jensen Huang', amount: 1800.90, status: 'paid' },
  { id: 'XM9141', dueDate: '20 Sep 2021', clientName: 'Alex Grim', amount: 556.00, status: 'pending' },
  { id: 'RG0314', dueDate: '01 Oct 2021', clientName: 'John Morrison', amount: 14002.33, status: 'paid' },
  { id: 'RT2080', dueDate: '12 Oct 2021', clientName: 'Alyssa Kihn', amount: 102.04, status: 'pending' },
  { id: 'AA1449', dueDate: '14 Oct 2021', clientName: 'Mellisa Clarke', amount: 4032.33, status: 'pending' },
  { id: 'TY9141', dueDate: '31 Oct 2021', clientName: 'Thomas Wayne', amount: 6155.91, status: 'pending' },
  { id: 'FV2353', dueDate: '12 Nov 2021', clientName: 'Anita Wainwright', amount: 3102.04, status: 'draft' },
];

export default function Home() {
  const [invoices] = useState<InvoiceCardProps[]>(MOCK_INVOICES);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  return (
    <div className="flex flex-col gap-8 md:gap-14 lg:gap-16">
      {/* Header Section */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-[32px] font-bold tracking-[-0.63px] md:tracking-[-1px] text-text-dark dark:text-white transition-colors">
            Invoices
          </h1>
          <p className="text-sm font-medium text-text-gray dark:text-text-gray-light mt-1 md:mt-2">
            <span className="hidden md:inline">There are </span>
            {invoices.length === 0 ? 'no invoices' : `${invoices.length} total invoices`}
          </p>
        </div>

        <div className="flex items-center gap-4 md:gap-10">
          {/* Filter Dropdown (UI Only) */}
          <button className="flex items-center gap-3 md:gap-4 group cursor-pointer">
            <span className="text-sm md:text-base font-bold text-text-dark dark:text-white transition-colors">
              Filter <span className="hidden md:inline">by status</span>
            </span>
            <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg" className="group-hover:rotate-180 transition-transform duration-300">
              <path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd" />
            </svg>
          </button>

          {/* New Invoice Button */}
          <button 
            onClick={() => setIsFormOpen(true)}
            className="flex items-center p-1.5 md:p-2 bg-primary-purple hover:bg-primary-purple-light text-white rounded-[24px] transition-colors group"
          >
            <div className="flex-center w-8 h-8 bg-white rounded-full">
              <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.313 10.036V6.322h3.691v-2.054H6.313V.554H4.259v3.714H.568v2.054h3.691v3.714z" fill="#7C5DFA" fillRule="nonzero" />
              </svg>
            </div>
            <span className="ml-2 mr-3 md:ml-4 md:mr-6 text-sm md:text-base font-bold">
              New <span className="hidden md:inline">Invoice</span>
            </span>
          </button>
        </div>
      </header>

      {/* Invoice List Section */}
      <div className="flex flex-col gap-4">
        {invoices.length > 0 ? (
          invoices.map((invoice) => (
            <InvoiceCard key={invoice.id} {...invoice} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="relative w-[193px] h-[160px] mb-10">
              <Image 
                src="/file.svg"
                alt="No invoices"
                fill
                className="opacity-50"
              />
            </div>
            <h2 className="text-xl font-bold text-text-dark dark:text-white mb-6">
              There is nothing here
            </h2>
            <p className="text-sm font-medium text-text-gray dark:text-text-gray-light max-w-[220px]">
              Create an invoice by clicking the <span className="font-bold">New Invoice</span> button and get started
            </p>
          </div>
        )}
      </div>

      {/* Invoice Form Drawer */}
      <InvoiceForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </div>
  );
}
