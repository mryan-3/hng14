'use client';

import { useState, useEffect } from 'react';
import ItemFormList from './item-form-list';
import BillFromSection from './bill-from-section';
import BillToSection from './bill-to-section';
import FormFooter from './form-footer';
import { Input, Label, Select } from '../ui/input';
import { Item } from './item-row';

interface InvoiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
}

export default function InvoiceForm({ isOpen, onClose, initialData }: InvoiceFormProps) {
  const [items, setItems] = useState<Item[]>(initialData?.items || []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)]" onClick={onClose} />
      <div className={`absolute top-0 left-0 h-full w-full md:w-[616px] lg:w-[719px] lg:pl-[103px] bg-white dark:bg-[#141625] shadow-2xl transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}>
        <div className="flex flex-col h-full">
          <div className="flex-1 p-8 md:p-14">
            <h2 className="text-2xl font-bold text-text-dark dark:text-white mb-12">
              {initialData ? <>Edit <span className="text-text-gray">#</span>{initialData.id}</> : 'New Invoice'}
            </h2>
            <div className="flex flex-col gap-12">
              <BillFromSection initialData={initialData} />
              <BillToSection initialData={initialData} />
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><Label>Invoice Date</Label><Input type="date" defaultValue={initialData?.createdAt} /></div>
                <div><Label>Payment Terms</Label><Select defaultValue={initialData?.paymentTerms}><option value="1">Net 1 Day</option><option value="7">Net 7 Days</option><option value="14">Net 14 Days</option><option value="30">Net 30 Days</option></Select></div>
                <div className="md:col-span-2"><Label>Project Description</Label><Input placeholder="e.g. Graphic Design Service" defaultValue={initialData?.description} /></div>
              </section>
              <ItemFormList items={items} onChange={setItems} />
            </div>
          </div>
          <FormFooter initialData={initialData} onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
