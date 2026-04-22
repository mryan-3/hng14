'use client';

import { Input, Label } from '../ui/input';

export interface Item {
  name: string;
  qty: number;
  price: number;
  total: number;
}

interface ItemRowProps {
  item: Item;
  index: number;
  onUpdate: (index: number, field: keyof Item, value: string | number) => void;
  onRemove: (index: number) => void;
}

export default function ItemRow({ item, index, onUpdate, onRemove }: ItemRowProps) {
  return (
    <div className="grid grid-cols-4 md:grid-cols-[3fr_1fr_1.5fr_1fr_auto] gap-4 items-end">
      <div className="col-span-4 md:col-span-1">
        <Label className="md:hidden">Item Name</Label>
        <Input value={item.name} onChange={(e) => onUpdate(index, 'name', e.target.value)} />
      </div>

      <div className="col-span-1 md:col-span-1">
        <Label className="md:hidden">Qty.</Label>
        <Input type="number" value={item.qty} onChange={(e) => onUpdate(index, 'qty', e.target.value)} />
      </div>

      <div className="col-span-2 md:col-span-1">
        <Label className="md:hidden">Price</Label>
        <Input type="number" value={item.price} onChange={(e) => onUpdate(index, 'price', e.target.value)} />
      </div>

      <div className="col-span-1 md:col-span-1">
        <Label className="md:hidden">Total</Label>
        <div className="flex items-center h-12 md:h-14 font-bold text-text-gray dark:text-text-gray-light text-sm">
          {item.total.toFixed(2)}
        </div>
      </div>

      <button 
        onClick={() => onRemove(index)}
        className="flex items-center justify-center p-2 mb-3 md:mb-4 group"
        aria-label="Delete item"
      >
        <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg" className="fill-[#888EB0] group-hover:fill-error transition-colors">
          <path d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0c.31 0 .584.209.669.508l.233.826h2.957c.191 0 .347.155.347.347v.695a.346.346 0 01-.347.347H.701a.346.346 0 01-.347-.347v-.695c0-.192.156-.347.347-.347h2.957l.233-.826A.695.695 0 014.56 0h3.913z" fillRule="nonzero" />
        </svg>
      </button>
    </div>
  );
}
