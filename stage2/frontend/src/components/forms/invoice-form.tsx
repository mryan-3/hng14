'use client';

import { useState, useEffect } from 'react';
import ItemFormList from './item-form-list';
import BillFromSection from './bill-from-section';
import BillToSection from './bill-to-section';
import FormFooter from './form-footer';
import { Input, Label } from '../ui/input';
import CustomSelect from '../ui/custom-select';
import DatePicker from '../ui/date-picker';
import { Item } from './item-row';

interface InvoiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
}

export default function InvoiceForm({ isOpen, onClose, initialData }: InvoiceFormProps) {
  const [mounted, setMounted] = useState(false);
  const getTodayFormatted = () => {
    const today = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;
  };

  const [items, setItems] = useState<Item[]>(initialData?.items || []);
  const [invoiceDate, setInvoiceDate] = useState(initialData?.createdAt || '');
  const [paymentTerms, setPaymentTerms] = useState(initialData?.paymentTerms || 30);
  
  useEffect(() => {
    setMounted(true);
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

  // Sync state if initialData changes (e.g. when opening different invoices)
  useEffect(() => {
    if (mounted) {
      if (initialData) {
        setItems(initialData.items || []);
        setInvoiceDate(initialData.createdAt || getTodayFormatted());
        setPaymentTerms(initialData.paymentTerms || 30);
      } else {
        setItems([]);
        setInvoiceDate(getTodayFormatted());
        setPaymentTerms(30);
      }
    }
  }, [initialData, isOpen, mounted]);

  return (
    <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} overflow-x-hidden`}>
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)]" onClick={onClose} />
      <div className={`absolute top-0 left-0 h-full w-full md:w-[616px] lg:w-[719px] lg:pl-[103px] bg-white dark:bg-background-dark shadow-2xl transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto overflow-x-hidden hide-scrollbar lg:rounded-r-[20px] flex flex-col`}>
        <div className="flex-1 p-8 md:px-14 md:pt-14 md:pb-4">
          <h2 className="text-2xl font-bold text-text-dark dark:text-white mb-10 tracking-[-0.5px]">
            {initialData ? <>Edit <span className="text-text-gray">#</span>{initialData.id}</> : 'New Invoice'}
          </h2>
          
          <form className="flex flex-col gap-8">
            <BillFromSection initialData={initialData} />
            <BillToSection initialData={initialData} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <DatePicker 
                label="Invoice Date" 
                value={invoiceDate} 
                onChange={setInvoiceDate} 
              />
              <CustomSelect 
                label="Payment Terms" 
                value={paymentTerms} 
                options={[
                  { label: 'Net 1 Day', value: 1 },
                  { label: 'Net 7 Days', value: 7 },
                  { label: 'Net 14 Days', value: 14 },
                  { label: 'Net 30 Days', value: 30 },
                ]} 
                onChange={(val) => setPaymentTerms(Number(val))} 
              />
            </div>

            <div className="space-y-2">
              <Label>Project Description</Label>
              <Input placeholder="e.g. Graphic Design Service" defaultValue={initialData?.description} />
            </div>

            <ItemFormList items={items} onChange={setItems} />
          </form>
        </div>
        <FormFooter initialData={initialData} onClose={onClose} />
      </div>
    </div>
  );
}
