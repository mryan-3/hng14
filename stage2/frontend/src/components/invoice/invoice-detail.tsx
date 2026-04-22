// Moved from components/app to components/invoice
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import ConfirmationModal from '@/components/ui/confirmation-modal';
import InvoiceDetailHeader from './invoice-detail-header';
import InvoiceDetailBody from './invoice-detail-body';
import { Invoice } from '@/lib/mock-invoices';

interface InvoiceDetailProps {
  invoice: Invoice;
}

export default function InvoiceDetail({ invoice }: InvoiceDetailProps) {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    setIsDeleteModalOpen(false);
    router.push('/');
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 pb-32 lg:pb-14">
      <InvoiceDetailHeader status={invoice.status} onDelete={() => setIsDeleteModalOpen(true)} />
      <InvoiceDetailBody invoice={invoice} />

      <div className="md:hidden flex items-center justify-center gap-2 bg-white dark:bg-secondary-dark p-6 fixed bottom-0 left-0 w-full shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <Button variant="secondary" className="flex-1 !px-4" onClick={() => {}}>Edit</Button>
        <Button variant="danger" className="flex-1 !px-4" onClick={() => setIsDeleteModalOpen(true)}>Delete</Button>
        <Button variant="primary" className="flex-1 !px-4">Paid</Button>
      </div>

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