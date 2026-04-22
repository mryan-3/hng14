'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { InvoiceStatus } from '@/components/ui/status-badge';
import ConfirmationModal from '@/components/ui/confirmation-modal';
import InvoiceDetailHeader from '@/components/invoice/invoice-detail-header';
import InvoiceDetailInfo from '@/components/invoice/invoice-detail-info';
import InvoiceDetailTable from '@/components/invoice/invoice-detail-table';
import DetailFooter from '@/components/invoice/detail-footer';
import InvoiceForm from '@/components/forms/invoice-form';
import { useInvoices } from '@/context/invoice-context';

export default function InvoiceDetail() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { invoices, isLoaded, deleteInvoice, markAsPaid } = useInvoices();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  
  const invoice = invoices.find(inv => inv.id === id);

  if (!isLoaded) return null;
  if (!invoice) return <div className="text-center py-20 text-text-dark dark:text-white font-bold">Invoice not found</div>;
  
  return (
    <div className="flex flex-col gap-6 md:gap-8 pb-32 lg:pb-14">
      <Link href="/" className="flex items-center gap-6 group w-fit">
        <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg" className="rotate-180">
          <path d="M1 1l4 4-4 4" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd" />
        </svg>
        <span className="text-xs font-bold text-text-dark dark:text-white group-hover:text-text-gray transition-colors">Go back</span>
      </Link>

      <InvoiceDetailHeader 
        status={invoice.status} 
        onDelete={() => setIsDeleteModalOpen(true)} 
        onEdit={() => setIsEditFormOpen(true)} 
        onMarkAsPaid={() => markAsPaid(invoice.id)} 
      />

      <div className="bg-white dark:bg-secondary-dark p-6 md:p-8 lg:p-12 rounded-lg shadow-sm flex flex-col gap-10 md:gap-14">
        <InvoiceDetailInfo {...invoice} dueDate={invoice.paymentDue} />
        <InvoiceDetailTable items={invoice.items} total={invoice.total} />
      </div>

      <InvoiceForm 
        isOpen={isEditFormOpen} 
        onClose={() => setIsEditFormOpen(false)} 
        initialData={invoice} 
      />

      <DetailFooter 
        onDelete={() => setIsDeleteModalOpen(true)} 
        onEdit={() => setIsEditFormOpen(true)} 
        onMarkAsPaid={() => markAsPaid(invoice.id)} 
      />

      <ConfirmationModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={() => {
          deleteInvoice(invoice.id);
          router.push('/');
        }} 
        title="Confirm Deletion" 
        message={`Are you sure you want to delete invoice #${invoice.id}? This action cannot be undone.`} 
      />
    </div>
  );
}
