'use client';

import StatusBadge, { InvoiceStatus } from '../ui/status-badge';
import Button from '../ui/button';

interface InvoiceDetailHeaderProps {
  status: InvoiceStatus;
  onDelete: () => void;
  onEdit: () => void;
  onMarkAsPaid: () => void;
}

export default function InvoiceDetailHeader({ 
  status, 
  onDelete, 
  onEdit, 
  onMarkAsPaid 
}: InvoiceDetailHeaderProps) {
  return (
    <div className="flex items-center justify-between bg-white dark:bg-secondary-dark p-6 md:px-8 md:py-5 rounded-lg shadow-sm">
      <div className="flex items-center justify-between w-full md:w-auto md:gap-4">
        <span className="text-sm font-medium text-[#858BB2] dark:text-text-gray-light">Status</span>
        <StatusBadge status={status} />
      </div>
      <div className="hidden md:flex items-center gap-2">
        <Button variant="secondary" onClick={onEdit}>Edit</Button>
        <Button variant="danger" onClick={onDelete}>Delete</Button>
        <Button variant="primary" onClick={onMarkAsPaid}>Mark as Paid</Button>
      </div>
    </div>
  );
}