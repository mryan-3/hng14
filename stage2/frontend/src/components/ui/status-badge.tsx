'use client';

export type InvoiceStatus = 'paid' | 'pending' | 'draft';

interface StatusBadgeProps {
  status: InvoiceStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusStyles = {
    paid: {
      bg: 'bg-[rgba(51,214,159,0.06)]',
      dot: 'bg-[#33D69F]',
      text: 'text-[#33D69F]',
      label: 'Paid'
    },
    pending: {
      bg: 'bg-[rgba(255,143,0,0.06)]',
      dot: 'bg-[#FF8F00]',
      text: 'text-[#FF8F00]',
      label: 'Pending'
    },
    draft: {
      bg: 'bg-[rgba(55,59,83,0.06)] dark:bg-[rgba(223,227,250,0.06)]',
      dot: 'bg-[#373B53] dark:bg-[#DFE3FA]',
      text: 'text-[#373B53] dark:text-[#DFE3FA]',
      label: 'Draft'
    }
  };

  const current = statusStyles[status];

  return (
    <div className={`flex items-center justify-center w-[104px] h-10 rounded-md ${current.bg} ${current.text} font-bold text-sm capitalize transition-colors`}>
      <span className={`w-2 h-2 rounded-full mr-2 ${current.dot}`} />
      {current.label}
    </div>
  );
}
