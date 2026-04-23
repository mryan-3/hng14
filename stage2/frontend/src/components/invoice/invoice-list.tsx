// Moved from components/app to components/invoice
'use client';

import Image from 'next/image';
import InvoiceCard from '@/components/invoice/invoice-card';
import { Invoice } from '@/context/invoice-context';

interface InvoiceListProps {
  invoices: Invoice[];
}

export default function InvoiceList({ invoices }: InvoiceListProps) {
  return (
    <div className="flex flex-col gap-4">
      {invoices.length > 0 ? (
        invoices.map((invoice) => (
          <InvoiceCard
            key={invoice.id}
            id={invoice.id}
            dueDate={invoice.paymentDue}
            clientName={invoice.clientName}
            amount={invoice.total}
            status={invoice.status}
          />
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
  );
}