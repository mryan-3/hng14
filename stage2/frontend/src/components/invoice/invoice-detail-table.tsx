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
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
  };

  return (
    <div className="rounded-lg overflow-hidden bg-[#F9FAFE] dark:bg-[#252945]">
      <div className="p-6 md:p-8 lg:p-8">
        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-[3fr_1fr_1.5fr_1.5fr] mb-8 text-xs font-medium text-text-gray dark:text-text-gray-light">
          <p>Item Name</p>
          <p className="text-center">QTY.</p>
          <p className="text-right">Price</p>
          <p className="text-right">Total</p>
        </div>
        
        <div className="flex flex-col gap-6 md:gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between md:grid md:grid-cols-[3fr_1fr_1.5fr_1.5fr]">
              <div className="flex flex-col gap-2 md:block">
                <p className="text-xs md:text-sm font-bold text-text-dark dark:text-white">{item.name}</p>
                <p className="md:hidden text-xs font-bold text-[#7E88C3] dark:text-[#888EB0]">
                  {item.qty} x {formatCurrency(item.price)}
                </p>
              </div>
              
              <p className="hidden md:block text-center text-sm font-bold text-[#7E88C3] dark:text-[#888EB0]">{item.qty}</p>
              <p className="hidden md:block text-right text-sm font-bold text-[#7E88C3] dark:text-[#888EB0]">{formatCurrency(item.price)}</p>
              
              <p className="text-xs md:text-sm font-bold text-text-dark dark:text-white text-right">
                {formatCurrency(item.total)}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer / Grand Total */}
      <div className="flex items-center justify-between px-6 py-6 md:px-8 md:py-8 bg-[#373B53] dark:bg-text-dark text-white">
        <p className="text-xs font-medium">Grand Total</p>
        <p className="text-xl md:text-2xl font-bold">{formatCurrency(total)}</p>
      </div>
    </div>
  );
}
