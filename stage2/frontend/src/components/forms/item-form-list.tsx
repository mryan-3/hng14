'use client';

import Button from '../ui/button';
import ItemRow, { Item } from './item-row';

interface ItemFormListProps {
  items: Item[];
  onChange: (items: Item[]) => void;
}

export default function ItemFormList({ items, onChange }: ItemFormListProps) {
  const addItem = () => {
    onChange([...items, { name: '', qty: 1, price: 0, total: 0 }]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof Item, value: string | number) => {
    const newItems = [...items];
    const item = { ...newItems[index], [field]: value };
    if (field === 'qty' || field === 'price') {
      item.total = Number(item.qty) * Number(item.price);
    }
    newItems[index] = item;
    onChange(newItems);
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[#777F98] text-[18px] font-bold tracking-[-0.38px] mb-4">Item List</h3>
      <div className="hidden md:grid grid-cols-[3fr_1fr_1.5fr_1fr_auto] gap-4 mb-4 text-sm font-medium text-[#7E88C3]">
        <p>Item Name</p>
        <p>Qty.</p>
        <p>Price</p>
        <p>Total</p>
        <div className="w-4" />
      </div>
      <div className="flex flex-col gap-12 md:gap-4 mb-4">
        {items.map((item, index) => (
          <ItemRow key={index} item={item} index={index} onUpdate={updateItem} onRemove={removeItem} />
        ))}
      </div>
      <Button variant="secondary" className="w-full" onClick={addItem}>
        + Add New Item
      </Button>
    </div>
  );
}
