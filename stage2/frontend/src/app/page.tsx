'use client';

import { useState } from 'react';
import InvoiceCard, { InvoiceCardProps } from '@/components/invoice/invoice-card';
import InvoiceForm from '@/components/forms/invoice-form';
import HomeHeader from '@/components/invoice/home-header';
import EmptyState from '@/components/invoice/empty-state';

const MOCK_INVOICES: InvoiceCardProps[] = [
  { id: 'RT3080', dueDate: '19 Aug 2021', clientName: 'Jensen Huang', amount: 1800.90, status: 'paid' },
  { id: 'XM9141', dueDate: '20 Sep 2021', clientName: 'Alex Grim', amount: 556.00, status: 'pending' },
  { id: 'RG0314', dueDate: '01 Oct 2021', clientName: 'John Morrison', amount: 14002.33, status: 'paid' },
  { id: 'RT2080', dueDate: '12 Oct 2021', clientName: 'Alyssa Kihn', amount: 102.04, status: 'pending' },
  { id: 'AA1449', dueDate: '14 Oct 2021', clientName: 'Mellisa Clarke', amount: 4032.33, status: 'pending' },
  { id: 'TY9141', dueDate: '31 Oct 2021', clientName: 'Thomas Wayne', amount: 6155.91, status: 'pending' },
  { id: 'FV2353', dueDate: '12 Nov 2021', clientName: 'Anita Wainwright', amount: 3102.04, status: 'draft' },
];

export default function Home() {
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
    ? MOCK_INVOICES.filter((invoice) => selectedStatuses.includes(invoice.status))
    : MOCK_INVOICES;

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
          filteredInvoices.map((invoice) => <InvoiceCard key={invoice.id} {...invoice} />)
        ) : (
          <EmptyState />
        )}
      </div>
      <InvoiceForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
}
