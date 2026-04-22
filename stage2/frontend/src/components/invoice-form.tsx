'use client';

import { useState, useEffect } from 'react';
import { Input, Label, Select } from './ui/input';
import Button from './ui/button';
import ItemFormList, { Item } from './item-form-list';

interface InvoiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any; // To be typed in Step 7
}

export default function InvoiceForm({ isOpen, onClose, initialData }: InvoiceFormProps) {
  const [items, setItems] = useState<Item[]>(initialData?.items || []);
  
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
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
    <div 
      className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-[rgba(0,0,0,0.5)]" 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={`absolute top-0 left-0 h-full w-full md:w-[616px] lg:w-[719px] lg:pl-[103px] bg-white dark:bg-[#141625] shadow-2xl transition-transform duration-500 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } overflow-y-auto`}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 p-8 md:p-14">
            <h2 className="text-2xl font-bold text-text-dark dark:text-white mb-12">
              {initialData ? (
                <>Edit <span className="text-text-gray">#</span>{initialData.id}</>
              ) : (
                'New Invoice'
              )}
            </h2>

            <div className="flex flex-col gap-12">
              {/* Bill From */}
              <section className="flex flex-col gap-6">
                <p className="text-primary-purple font-bold text-xs tracking-[-0.25px]">Bill From</p>
                <div className="flex flex-col gap-6">
                  <div>
                    <Label>Street Address</Label>
                    <Input defaultValue={initialData?.senderAddress?.street} />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <Label>City</Label>
                      <Input defaultValue={initialData?.senderAddress?.city} />
                    </div>
                    <div>
                      <Label>Post Code</Label>
                      <Input defaultValue={initialData?.senderAddress?.postCode} />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <Label>Country</Label>
                      <Input defaultValue={initialData?.senderAddress?.country} />
                    </div>
                  </div>
                </div>
              </section>

              {/* Bill To */}
              <section className="flex flex-col gap-6">
                <p className="text-primary-purple font-bold text-xs tracking-[-0.25px]">Bill To</p>
                <div className="flex flex-col gap-6">
                  <div>
                    <Label>Client&apos;s Name</Label>
                    <Input defaultValue={initialData?.clientName} />
                  </div>
                  <div>
                    <Label>Client&apos;s Email</Label>
                    <Input placeholder="e.g. email@example.com" defaultValue={initialData?.clientEmail} />
                  </div>
                  <div>
                    <Label>Street Address</Label>
                    <Input defaultValue={initialData?.clientAddress?.street} />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <Label>City</Label>
                      <Input defaultValue={initialData?.clientAddress?.city} />
                    </div>
                    <div>
                      <Label>Post Code</Label>
                      <Input defaultValue={initialData?.clientAddress?.postCode} />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <Label>Country</Label>
                      <Input defaultValue={initialData?.clientAddress?.country} />
                    </div>
                  </div>
                </div>
              </section>

              {/* Other Info */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Invoice Date</Label>
                  <Input type="date" defaultValue={initialData?.createdAt} />
                </div>
                <div>
                  <Label>Payment Terms</Label>
                  <Select defaultValue={initialData?.paymentTerms}>
                    <option value="1">Net 1 Day</option>
                    <option value="7">Net 7 Days</option>
                    <option value="14">Net 14 Days</option>
                    <option value="30">Net 30 Days</option>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label>Project Description</Label>
                  <Input placeholder="e.g. Graphic Design Service" defaultValue={initialData?.description} />
                </div>
              </section>

              {/* Item List */}
              <ItemFormList items={items} onChange={setItems} />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="sticky bottom-0 left-0 w-full p-8 md:p-14 bg-white dark:bg-[#141625] shadow-[0_-10px_20px_rgba(0,0,0,0.05)] rounded-t-[20px] md:rounded-none">
            <div className="flex items-center justify-between">
              <Button variant="secondary" onClick={onClose}>
                {initialData ? 'Cancel' : 'Discard'}
              </Button>
              <div className="flex gap-2">
                {!initialData && (
                  <Button variant="dark" onClick={onClose}>
                    Save as Draft
                  </Button>
                )}
                <Button variant="primary" onClick={onClose}>
                  {initialData ? 'Save Changes' : 'Save & Send'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
