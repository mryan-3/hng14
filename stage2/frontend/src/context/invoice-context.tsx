'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { InvoiceStatus } from '@/components/ui/status-badge';
import { Item } from '@/components/forms/item-row';

export interface Invoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: InvoiceStatus;
  senderAddress: { street: string; city: string; postCode: string; country: string; };
  clientAddress: { street: string; city: string; postCode: string; country: string; };
  items: Item[];
  total: number;
}

const MOCK_INVOICES: Invoice[] = [
  {
    id: 'RT3080',
    createdAt: '19 Aug 2021',
    paymentDue: '19 Sep 2021',
    description: 'Re-branding',
    paymentTerms: 30,
    clientName: 'Jensen Huang',
    clientEmail: 'jensenh@nvidia.com',
    status: 'paid',
    senderAddress: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' },
    clientAddress: { street: '106 Kendell Street', city: 'Sharrington', postCode: 'NR24 2WT', country: 'United Kingdom' },
    items: [{ name: 'Brand Guidelines', qty: 1, price: 1800.90, total: 1800.90 }],
    total: 1800.90
  },
  {
    id: 'XM9141',
    createdAt: '21 Aug 2021',
    paymentDue: '20 Sep 2021',
    description: 'Graphic Design',
    paymentTerms: 30,
    clientName: 'Alex Grim',
    clientEmail: 'alexgrim@mail.com',
    status: 'pending',
    senderAddress: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' },
    clientAddress: { street: '84 Church Way', city: 'Bradford', postCode: 'BD1 9PB', country: 'United Kingdom' },
    items: [
      { name: 'Banner Design', qty: 1, price: 156.00, total: 156.00 },
      { name: 'Email Design', qty: 2, price: 200.00, total: 400.00 }
    ],
    total: 556.00
  }
];

interface InvoiceContextType {
  invoices: Invoice[];
  isLoaded: boolean;
  addInvoice: (invoice: Omit<Invoice, 'id'>) => Invoice;
  updateInvoice: (invoice: Invoice) => void;
  deleteInvoice: (id: string) => void;
  markAsPaid: (id: string) => void;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

const STORAGE_KEY = 'invoices';

export function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setInvoices(JSON.parse(stored));
      } catch (e) {
        setInvoices(MOCK_INVOICES);
      }
    } else {
      setInvoices(MOCK_INVOICES);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
    }
  }, [invoices, isLoaded]);

  const addInvoice = (invoice: Omit<Invoice, 'id'>) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const id = 
      letters.charAt(Math.floor(Math.random() * letters.length)) +
      letters.charAt(Math.floor(Math.random() * letters.length)) +
      Math.floor(1000 + Math.random() * 9000).toString();
    
    const newInvoice = { ...invoice, id };
    setInvoices(prev => [newInvoice, ...prev]);
    return newInvoice;
  };

  const updateInvoice = (updatedInvoice: Invoice) => {
    setInvoices(prev => prev.map(inv => inv.id === updatedInvoice.id ? updatedInvoice : inv));
  };

  const deleteInvoice = (id: string) => {
    setInvoices(prev => prev.filter(inv => inv.id !== id));
  };

  const markAsPaid = (id: string) => {
    setInvoices(prev => prev.map(inv => 
      inv.id === id ? { ...inv, status: 'paid' as InvoiceStatus } : inv
    ));
  };

  return (
    <InvoiceContext.Provider value={{
      invoices,
      isLoaded,
      addInvoice,
      updateInvoice,
      deleteInvoice,
      markAsPaid,
    }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoices() {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error('useInvoices must be used within an InvoiceProvider');
  }
  return context;
}
