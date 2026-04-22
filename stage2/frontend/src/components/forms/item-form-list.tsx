'use client';

import ItemRow, { Item } from './item-row';
import Button from '../ui/button';

interface ItemFormListProps {
  items: Item[];
  onChange: (items: Item[]) => void;
}

export default function ItemFormList({ items, onChange }: ItemFormListProps) {
  const addItem = () => {
    onChange([...items, { name: '', qty: 1, price: 0, total: 0 }]);
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

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <section className="flex flex-col">
      <h3 className="text-sm md:text-lg font-bold text-[#777F98] dark:text-[#777F98] mb-4">Item List</h3>
      
      <div className="hidden md:grid grid-cols-[2.5fr_0.6fr_1fr_0.7fr_auto] gap-4 mb-4 text-xs font-medium text-text-gray dark:text-text-gray-light">
        <p>Item Name</p>
        <p>Qty.</p>
        <p>Price</p>
        <p>Total</p>
        <div className="w-[13px]" />
      </div>

      <div className="flex flex-col gap-12 md:gap-4 mb-4">
        {items.map((item, index) => (
          <ItemRow 
            key={index} 
            item={item} 
            index={index} 
            onUpdate={updateItem} 
            onRemove={removeItem} 
          />
        ))}
      </div>

      <Button 
        type="button"
        variant="ghost"
        onClick={addItem}
        className="w-full text-[#7E88C3] dark:text-text-gray-light"
      >
        + Add New Item
      </Button>
    </section>
  );
}
