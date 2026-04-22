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

import { useInvoices } from '@/context/invoice-context';

export default function InvoiceForm({ isOpen, onClose, initialData }: InvoiceFormProps) {
  const { addInvoice, updateInvoice } = useInvoices();
  const [mounted, setMounted] = useState(false);
  
  const getTodayFormatted = () => {
    const today = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;
  };

  const [items, setItems] = useState<Item[]>([]);
  const [invoiceDate, setInvoiceDate] = useState('');
  const [paymentTerms, setPaymentTerms] = useState(30);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [description, setDescription] = useState('');
  const [senderAddress, setSenderAddress] = useState({ street: '', city: '', postCode: '', country: '' });
  const [clientAddress, setClientAddress] = useState({ street: '', city: '', postCode: '', country: '' });

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (mounted && isOpen) {
      setItems(initialData?.items || []);
      setInvoiceDate(initialData?.createdAt || getTodayFormatted());
      setPaymentTerms(initialData?.paymentTerms || 30);
      setClientName(initialData?.clientName || '');
      setClientEmail(initialData?.clientEmail || '');
      setDescription(initialData?.description || '');
      setSenderAddress(initialData?.senderAddress || { street: '', city: '', postCode: '', country: '' });
      setClientAddress(initialData?.clientAddress || { street: '', city: '', postCode: '', country: '' });
    }
  }, [initialData, isOpen, mounted]);

  const handleSave = (status: 'pending' | 'draft') => {
    const total = items.reduce((acc, item) => acc + item.total, 0);
    const invoiceData = {
      createdAt: invoiceDate || getTodayFormatted(),
      paymentDue: invoiceDate || getTodayFormatted(), 
      description,
      paymentTerms,
      clientName,
      clientEmail,
      status: status as any,
      senderAddress,
      clientAddress,
      items,
      total,
    };

    if (initialData) {
      updateInvoice({ ...invoiceData, id: initialData.id });
    } else {
      addInvoice(invoiceData);
    }
    onClose();
  };

  const updateSenderAddress = (field: string, value: string) => {
    setSenderAddress(prev => ({ ...prev, [field]: value }));
  };

  const updateClientAddress = (field: string, value: string) => {
    setClientAddress(prev => ({ ...prev, [field]: value }));
  };

  if (!mounted) return null;

  return (
    <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} overflow-x-hidden`}>
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)]" onClick={onClose} />
      <div className={`absolute top-0 left-0 h-full w-full md:w-[616px] lg:w-[719px] lg:pl-[103px] bg-white dark:bg-background-dark shadow-2xl transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto overflow-x-hidden hide-scrollbar lg:rounded-r-[20px] flex flex-col`}>
        <div className="flex-1 p-8 md:px-14 md:pt-14 md:pb-4 mt-[72px] lg:mt-0">
          <button 
            type="button" 
            onClick={onClose} 
            className="md:hidden flex items-center gap-6 mb-8 group w-fit"
          >
            <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg" className="rotate-180">
              <path d="M1 1l4 4-4 4" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd" />
            </svg>
            <span className="text-xs font-bold text-text-dark dark:text-white group-hover:text-text-gray transition-colors">Go back</span>
          </button>

          <h2 className="text-2xl font-bold text-text-dark dark:text-white mb-10 tracking-[-0.5px]">
            {initialData ? <>Edit <span className="text-text-gray">#</span>{initialData.id}</> : 'New Invoice'}
          </h2>
          
          <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
            <BillFromSection 
              data={senderAddress} 
              onChange={updateSenderAddress} 
            />
            <BillToSection 
              data={{ clientName, clientEmail, ...clientAddress }} 
              onClientNameChange={setClientName}
              onClientEmailChange={setClientEmail}
              onAddressChange={updateClientAddress}
            />
            
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
              <Input 
                placeholder="e.g. Graphic Design Service" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <ItemFormList items={items} onChange={setItems} />
          </form>
        </div>
        <FormFooter 
          initialData={initialData} 
          onClose={onClose} 
          onSaveDraft={() => handleSave('draft')}
          onSaveSend={() => handleSave('pending')}
        />
      </div>
    </div>
  );
}
