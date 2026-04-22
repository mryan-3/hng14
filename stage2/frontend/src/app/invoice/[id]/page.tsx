'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { InvoiceStatus } from '@/components/ui/status-badge';
import ConfirmationModal from '@/components/ui/confirmation-modal';
import InvoiceDetailHeader from '@/components/invoice/invoice-detail-header';
import InvoiceDetailInfo from '@/components/invoice/invoice-detail-info';
import InvoiceDetailTable from '@/components/invoice/invoice-detail-table';
import Button from '@/components/ui/button';

const MOCK_INVOICES = [
  { 
    id: 'RT3080', createdAt: '18 Aug 2021', dueDate: '19 Aug 2021', clientName: 'Jensen Huang', clientEmail: 'jensenh@mail.com', status: 'paid' as InvoiceStatus,
    senderAddress: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' },
    clientAddress: { street: '106 Kendal Street', city: 'Sharrington', postCode: 'NR24 5WQ', country: 'United Kingdom' },
    description: 'Graphic Design', items: [{ name: 'Banner Design', qty: 1, price: 156.00, total: 156.00 }, { name: 'Email Design', qty: 2, price: 200.00, total: 400.00 }],
    total: 1800.90 
  },
];

export default function InvoiceDetail() {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const invoice = MOCK_INVOICES[0];
  
  return (
    <div className="flex flex-col gap-6 md:gap-8 pb-32 lg:pb-14">
      <Link href="/" className="flex items-center gap-6 group w-fit">
        <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg" className="rotate-180"><path d="M1 1l4 4-4 4" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd" /></svg>
        <span className="text-xs font-bold text-text-dark dark:text-white group-hover:text-text-gray transition-colors">Go back</span>
      </Link>
      <InvoiceDetailHeader status={invoice.status} onDelete={() => setIsDeleteModalOpen(true)} onEdit={() => {}} onMarkAsPaid={() => {}} />
      <div className="flex flex-col gap-0 relative">
        <InvoiceDetailInfo {...invoice} />
        <div className="absolute top-[380px] left-0 w-full md:relative md:top-auto md:mt-[-40px]">
          <InvoiceDetailTable items={invoice.items} total={invoice.total} />
        </div>
      </div>
      <div className="md:hidden flex items-center justify-center gap-2 bg-white dark:bg-secondary-dark p-6 fixed bottom-0 left-0 w-full shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <Button variant="secondary" className="flex-1 !px-4" onClick={() => {}}>Edit</Button>
        <Button variant="danger" className="flex-1 !px-4" onClick={() => setIsDeleteModalOpen(true)}>Delete</Button>
        <Button variant="primary" className="flex-1 !px-4">Paid</Button>
      </div>
      <ConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={() => router.push('/')} title="Confirm Deletion" message={`Are you sure you want to delete invoice #${invoice.id}? This action cannot be undone.`} />
    </div>
  );
}
