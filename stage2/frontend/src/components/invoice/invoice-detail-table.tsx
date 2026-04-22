'use client';

interface Item {
  name: string;
  qty: number;
  price: number;
  total: number;
}

interface InvoiceDetailTableProps {
  items: Item[];
  total: number;
}

export default function InvoiceDetailTable({ items, total }: InvoiceDetailTableProps) {
  return (
    <div className="rounded-t-lg overflow-hidden bg-background-light dark:bg-secondary-dark-light">
      <div className="hidden md:grid grid-cols-[3fr_1fr_1.5fr_1.5fr] p-8 pb-4 text-sm font-medium text-text-gray dark:text-text-gray-light">
        <p>Item Name</p><p className="text-center">QTY.</p><p className="text-right">Price</p><p className="text-right">Total</p>
      </div>
      <div className="flex flex-col gap-6 p-6 md:p-8 md:pt-4">
        {items.map((item, idx) => (
          <div key={idx} className="grid grid-cols-[2fr_1fr] md:grid-cols-[3fr_1fr_1.5fr_1.5fr] items-center">
            <div className="flex flex-col md:block">
              <p className="text-sm font-bold text-text-dark dark:text-white mb-2 md:mb-0">{item.name}</p>
              <p className="md:hidden text-sm font-bold text-text-gray dark:text-text-gray-light">{item.qty} x £{item.price.toFixed(2)}</p>
            </div>
            <p className="hidden md:block text-center text-sm font-bold text-text-gray dark:text-text-gray-light">{item.qty}</p>
            <p className="hidden md:block text-right text-sm font-bold text-text-gray dark:text-text-gray-light">£{item.price.toFixed(2)}</p>
            <p className="text-right text-sm font-bold text-text-dark dark:text-white">£{item.total.toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between p-6 md:p-8 bg-[#373B53] dark:bg-text-dark text-white rounded-b-lg">
        <p className="text-sm font-medium">Amount Due</p><p className="text-xl md:text-2xl font-bold">£{total.toFixed(2)}</p>
      </div>
    </div>
  );
}
