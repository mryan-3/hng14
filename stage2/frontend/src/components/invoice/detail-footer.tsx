'use client';

import Button from '../ui/button';

interface DetailFooterProps {
  onDelete: () => void;
  onEdit: () => void;
  onMarkAsPaid: () => void;
}

export default function DetailFooter({ onDelete, onEdit, onMarkAsPaid }: DetailFooterProps) {
  return (
    <footer className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-secondary-dark p-6 flex items-center justify-between gap-2 shadow-[0_-10px_20px_rgba(72,84,159,0.1)] dark:shadow-none z-30">
      <Button variant="secondary" className="!rounded-full flex-1" onClick={onEdit}>Edit</Button>
      <Button variant="danger" className="!rounded-full flex-1" onClick={onDelete}>Delete</Button>
      <Button variant="primary" className="!rounded-full flex-1" onClick={onMarkAsPaid}>Mark as Paid</Button>
    </footer>
  );
}
