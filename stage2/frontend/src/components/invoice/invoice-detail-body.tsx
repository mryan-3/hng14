// Moved from components/app to components/invoice
'use client';

import { Invoice } from '@/lib/mock-invoices';
import InvoiceDetailItems from './invoice-detail-items';

interface InvoiceDetailBodyProps {
  invoice: Invoice;
}

export default function InvoiceDetailBody({ invoice }: InvoiceDetailBodyProps) {
  return (
    <div className="bg-white dark:bg-secondary-dark p-6 md:p-8 lg:p-12 rounded-lg shadow-sm flex flex-col gap-8 md:gap-11">
      <div className="flex flex-col md:flex-row md:justify-between gap-8">
        <div>
          <h1 className="text-base md:text-xl font-bold text-text-dark dark:text-white mb-2">
            <span className="text-text-gray">#</span>{invoice.id}
          </h1>
          <p className="text-sm font-medium text-text-gray dark:text-text-gray-light">{invoice.description}</p>
        </div>
        <div className="text-sm font-medium text-text-gray dark:text-text-gray-light text-left md:text-right">
          <p>{invoice.senderAddress.street}</p>
          <p>{invoice.senderAddress.city}</p>
          <p>{invoice.senderAddress.postCode}</p>
          <p>{invoice.senderAddress.country}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        <div className="flex flex-col justify-between gap-8">
          <div>
            <p className="text-sm font-medium text-text-gray dark:text-text-gray-light mb-3">Invoice Date</p>
            <p className="text-base md:text-xl font-bold text-text-dark dark:text-white">{invoice.createdAt}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-text-gray dark:text-text-gray-light mb-3">Payment Due</p>
            <p className="text-base md:text-xl font-bold text-text-dark dark:text-white">{invoice.dueDate}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-text-gray dark:text-text-gray-light mb-3">Bill To</p>
          <p className="text-base md:text-xl font-bold text-text-dark dark:text-white">{invoice.clientName}</p>
          <p className="text-sm font-medium text-text-gray dark:text-text-gray-light">{invoice.clientAddress.street}</p>
          <p className="text-sm font-medium text-text-gray dark:text-text-gray-light">{invoice.clientAddress.city}</p>
          <p className="text-sm font-medium text-text-gray dark:text-text-gray-light">{invoice.clientAddress.postCode}</p>
          <p className="text-sm font-medium text-text-gray dark:text-text-gray-light">{invoice.clientAddress.country}</p>
        </div>
      </div>

      <InvoiceDetailItems items={invoice.items} total={invoice.total} />
    </div>
  );
}