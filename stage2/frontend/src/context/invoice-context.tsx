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
        setInvoices([]);
      }
    } else {
      setInvoices([]);
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
