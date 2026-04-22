'use client';

import { useState } from 'react';
import InvoiceCard, { InvoiceCardProps } from '@/components/invoice/invoice-card';
import InvoiceForm from '@/components/forms/invoice-form';
import HomeHeader from '@/components/invoice/home-header';
import EmptyState from '@/components/invoice/empty-state';

import { useInvoices } from '@/context/invoice-context';

export default function Home() {
  const { invoices, isLoaded } = useInvoices();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const filteredInvoices = selectedStatuses.length > 0
    ? invoices.filter((invoice) => selectedStatuses.includes(invoice.status))
    : invoices;

  if (!isLoaded) return null;

  return (
    <div className="flex flex-col gap-8 md:gap-14 lg:gap-16">
      <HomeHeader
        count={filteredInvoices.length}
        onNewInvoice={() => setIsFormOpen(true)}
        selectedStatuses={selectedStatuses}
        onToggleStatus={toggleStatus}
      />
      <div className="flex flex-col gap-4">
        {filteredInvoices.length > 0 ? (
          filteredInvoices.map((invoice) => (
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
          <EmptyState />
        )}
      </div>
      <InvoiceForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
}
