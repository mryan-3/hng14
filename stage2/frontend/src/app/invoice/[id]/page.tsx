'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import StatusBadge, { InvoiceStatus } from '@/components/status-badge';
import Button from '@/components/ui/button';
import ConfirmationModal from '@/components/ui/confirmation-modal';
import { useState } from 'react';

// Mock data
const MOCK_INVOICES = [
  { 
    id: 'RT3080', 
    createdAt: '18 Aug 2021',
    dueDate: '19 Aug 2021', 
    clientName: 'Jensen Huang', 
    clientEmail: 'jensenh@mail.com',
    status: 'paid' as InvoiceStatus,
    senderAddress: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' },
    clientAddress: { street: '106 Kendal Street', city: 'Sharrington', postCode: 'NR24 5WQ', country: 'United Kingdom' },
    description: 'Graphic Design',
    items: [
      { name: 'Banner Design', qty: 1, price: 156.00, total: 156.00 },
      { name: 'Email Design', qty: 2, price: 200.00, total: 400.00 }
    ],
    total: 1800.90 
  },
];

export default function InvoiceDetail() {
  const params = useParams();
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const invoice = MOCK_INVOICES[0];

  const handleDelete = () => {
    // Logic to delete would go here
    setIsDeleteModalOpen(false);
    router.push('/');
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 pb-32 lg:pb-14">
      {/* Go Back Link */}
      <Link href="/" className="flex items-center gap-6 group w-fit">
        <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg" className="rotate-180">
          <path d="M1 1l4 4-4 4" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd" />
        </svg>
        <span className="text-xs font-bold text-text-dark dark:text-white group-hover:text-text-gray transition-colors">
          Go back
        </span>
      </Link>

      {/* Status Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-secondary-dark p-6 md:px-8 md:py-5 rounded-lg shadow-sm">
        <div className="flex items-center justify-between w-full md:w-auto md:gap-4">
          <span className="text-sm font-medium text-[#858BB2] dark:text-text-gray-light">Status</span>
          <StatusBadge status={invoice.status} />
        </div>

        {/* Action Buttons - Desktop */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="secondary">Edit</Button>
          <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)}>Delete</Button>
          <Button variant="primary">Mark as Paid</Button>
        </div>
      </div>

      {/* Main Invoice Content */}
      <div className="bg-white dark:bg-secondary-dark p-6 md:p-8 lg:p-12 rounded-lg shadow-sm flex flex-col gap-8 md:gap-11">
        {/* Top Info */}
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

        {/* Middle Info (Dates, Client, Email) */}
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
            <p className="text-base md:text-xl font-bold text-text-dark dark:text-white mb-3">{invoice.clientName}</p>
            <div className="text-xs md:text-sm font-medium text-text-gray dark:text-text-gray-light">
              <p>{invoice.clientAddress.street}</p>
              <p>{invoice.clientAddress.city}</p>
              <p>{invoice.clientAddress.postCode}</p>
              <p>{invoice.clientAddress.country}</p>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <p className="text-sm font-medium text-text-gray dark:text-text-gray-light mb-3">Sent to</p>
            <p className="text-base md:text-xl font-bold text-text-dark dark:text-white break-all">{invoice.clientEmail}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="rounded-t-lg overflow-hidden bg-background-light dark:bg-[#252945]">
          <div className="hidden md:grid grid-cols-[3fr_1fr_1.5fr_1.5fr] p-8 pb-4 text-sm font-medium text-text-gray dark:text-text-gray-light">
            <p>Item Name</p>
            <p className="text-center">QTY.</p>
            <p className="text-right">Price</p>
            <p className="text-right">Total</p>
          </div>

          <div className="flex flex-col gap-6 p-6 md:p-8 md:pt-4">
            {invoice.items.map((item, idx) => (
              <div key={idx} className="grid grid-cols-[2fr_1fr] md:grid-cols-[3fr_1fr_1.5fr_1.5fr] items-center">
                <div className="flex flex-col md:block">
                  <p className="text-sm font-bold text-text-dark dark:text-white mb-2 md:mb-0">{item.name}</p>
                  <p className="md:hidden text-sm font-bold text-text-gray dark:text-text-gray-light">
                    {item.qty} x £{item.price.toFixed(2)}
                  </p>
                </div>
                <p className="hidden md:block text-center text-sm font-bold text-text-gray dark:text-text-gray-light">{item.qty}</p>
                <p className="hidden md:block text-right text-sm font-bold text-text-gray dark:text-text-gray-light">£{item.price.toFixed(2)}</p>
                <p className="text-right text-sm font-bold text-text-dark dark:text-white">£{item.total.toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between p-6 md:p-8 bg-[#373B53] dark:bg-text-dark text-white rounded-b-lg">
            <p className="text-sm font-medium">Amount Due</p>
            <p className="text-xl md:text-2xl font-bold">£{invoice.total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons - Mobile Fixed Footer */}
      <div className="md:hidden flex items-center justify-center gap-2 bg-white dark:bg-secondary-dark p-6 fixed bottom-0 left-0 w-full shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <Button variant="secondary" className="flex-1 !px-4" onClick={() => {}}>Edit</Button>
        <Button variant="danger" className="flex-1 !px-4" onClick={() => setIsDeleteModalOpen(true)}>Delete</Button>
        <Button variant="primary" className="flex-1 !px-4">Paid</Button>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete invoice #${invoice.id}? This action cannot be undone.`}
      />
    </div>
  );
}
