export type InvoiceStatus = 'draft' | 'pending' | 'paid';

export interface InvoiceItem {
  name: string;
  qty: number;
  price: number;
  total: number;
}

export interface Invoice {
  id: string;
  createdAt: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  status: InvoiceStatus;
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  description: string;
  items: InvoiceItem[];
  total: number;
}

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'RT3080',
    createdAt: '18 Aug 2021',
    dueDate: '19 Aug 2021',
    clientName: 'Jensen Huang',
    clientEmail: 'jensenh@mail.com',
    status: 'paid',
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom',
    },
    clientAddress: {
      street: '106 Kendal Street',
      city: 'Sharrington',
      postCode: 'NR24 5WQ',
      country: 'United Kingdom',
    },
    description: 'Graphic Design',
    items: [
      { name: 'Banner Design', qty: 1, price: 156.0, total: 156.0 },
      { name: 'Email Design', qty: 2, price: 200.0, total: 400.0 },
    ],
    total: 1800.9,
  },
];
