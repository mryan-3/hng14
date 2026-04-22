'use client';

import { Input, Label } from '../ui/input';

interface BillToSectionProps {
  data: {
    clientName: string;
    clientEmail: string;
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  onClientNameChange: (val: string) => void;
  onClientEmailChange: (val: string) => void;
  onAddressChange: (field: string, value: string) => void;
}

export default function BillToSection({ 
  data, 
  onClientNameChange, 
  onClientEmailChange, 
  onAddressChange 
}: BillToSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <p className="text-primary-purple font-bold text-xs tracking-[-0.25px]">Bill To</p>
      <div className="flex flex-col gap-4">
        <div>
          <Label>Client's Name</Label>
          <Input 
            value={data.clientName} 
            onChange={(e) => onClientNameChange(e.target.value)} 
          />
        </div>
        <div>
          <Label>Client's Email</Label>
          <Input 
            placeholder="e.g. email@example.com" 
            value={data.clientEmail} 
            onChange={(e) => onClientEmailChange(e.target.value)} 
          />
        </div>
        <div>
          <Label>Street Address</Label>
          <Input 
            value={data.street} 
            onChange={(e) => onAddressChange('street', e.target.value)} 
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <Label>City</Label>
            <Input 
              value={data.city} 
              onChange={(e) => onAddressChange('city', e.target.value)} 
            />
          </div>
          <div>
            <Label>Post Code</Label>
            <Input 
              value={data.postCode} 
              onChange={(e) => onAddressChange('postCode', e.target.value)} 
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <Label>Country</Label>
            <Input 
              value={data.country} 
              onChange={(e) => onAddressChange('country', e.target.value)} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
