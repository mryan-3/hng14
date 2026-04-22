'use client';

import Link from 'next/link';
import StatusBadge, { InvoiceStatus } from '../ui/status-badge';

export interface InvoiceCardProps {
  id: string;
  dueDate: string;
  clientName: string;
  amount: number;
  status: InvoiceStatus;
}

export default function InvoiceCard({ id, dueDate, clientName, amount, status }: InvoiceCardProps) {
  const formattedAmount = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);

  return (
    <Link 
      href={`/invoice/${id}`}
      className="group grid grid-cols-2 md:grid-cols-[auto_auto_auto_auto_auto_auto] items-center bg-white dark:bg-secondary-dark p-6 md:px-8 md:py-4 rounded-lg border border-transparent hover:border-primary-purple transition-all duration-300 shadow-sm"
    >
      {/* ID Section */}
      <div className="text-xs md:text-sm font-bold text-text-dark dark:text-white mb-6 md:mb-0 md:w-20 lg:w-24">
        <span className="text-[#7E88C3]">#</span>{id}
      </div>

      {/* Due Date - Mobile Position */}
      <div className="text-sm font-medium text-text-gray dark:text-text-gray-light md:hidden text-right mb-6">
        {clientName}
      </div>

      {/* Date & Name Section - Desktop */}
      <div className="text-xs md:text-sm font-medium text-text-gray dark:text-text-gray-light md:w-28 lg:w-32">
        <span className="md:hidden">Due </span>{dueDate}
      </div>

      <div className="hidden md:block text-xs md:text-sm font-medium text-text-gray dark:text-text-gray-light md:w-28 lg:w-36">
        {clientName}
      </div>

      {/* Amount Section */}
      <div className="text-base md:text-lg font-bold text-text-dark dark:text-white md:w-28 lg:w-32 md:text-right md:mr-10">
        {formattedAmount}
      </div>

      {/* Status Badge */}
      <div className="flex justify-end md:justify-center">
        <StatusBadge status={status} />
      </div>

      {/* Arrow Icon - Desktop Only */}
      <div className="hidden md:flex justify-end lg:w-8">
        <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1l4 4-4 4" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd" />
        </svg>
      </div>
    </Link>
  );
}
