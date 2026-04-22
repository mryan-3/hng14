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
    <div className="rounded-lg overflow-hidden bg-background-light dark:bg-secondary-dark-light">
      <div className="p-6 md:p-8">
        <div className="hidden md:grid grid-cols-[3fr_1fr_1.5fr_1.5fr] mb-8 text-xs font-medium text-text-gray dark:text-text-gray-light">
          <p>Item Name</p>
          <p className="text-center">QTY.</p>
          <p className="text-right">Price</p>
          <p className="text-right">Total</p>
        </div>
        
        <div className="flex flex-col gap-6 md:gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="grid grid-cols-[2fr_1fr] md:grid-cols-[3fr_1fr_1.5fr_1.5fr] items-center">
              <div className="flex flex-col">
                <p className="text-xs md:text-sm font-bold text-text-dark dark:text-white mb-2 md:mb-0">{item.name}</p>
                <p className="md:hidden text-xs font-bold text-text-gray dark:text-text-gray-light">{item.qty} x £{item.price.toFixed(2)}</p>
              </div>
              <p className="hidden md:block text-center text-xs md:text-sm font-bold text-text-gray dark:text-text-gray-light">{item.qty}</p>
              <p className="hidden md:block text-right text-xs md:text-sm font-bold text-text-gray dark:text-text-gray-light">£{item.price.toFixed(2)}</p>
              <p className="text-right text-xs md:text-sm font-bold text-text-dark dark:text-white">£{item.total.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between px-6 py-6 md:px-8 md:py-8 bg-[#373B53] dark:bg-text-dark text-white">
        <p className="text-xs font-medium">Amount Due</p>
        <p className="text-xl md:text-2xl font-bold">£{total.toFixed(2)}</p>
      </div>
    </div>
  );
}
