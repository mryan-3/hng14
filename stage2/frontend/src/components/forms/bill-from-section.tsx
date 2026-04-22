'use client';

import { Input, Label } from '../ui/input';

interface BillFromSectionProps {
  data: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function BillFromSection({ data, onChange }: BillFromSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <p className="text-primary-purple font-bold text-xs tracking-[-0.25px]">Bill From</p>
      <div className="flex flex-col gap-4">
        <div>
          <Label>Street Address</Label>
          <Input 
            value={data.street} 
            onChange={(e) => onChange('street', e.target.value)} 
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <Label>City</Label>
            <Input 
              value={data.city} 
              onChange={(e) => onChange('city', e.target.value)} 
            />
          </div>
          <div>
            <Label>Post Code</Label>
            <Input 
              value={data.postCode} 
              onChange={(e) => onChange('postCode', e.target.value)} 
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <Label>Country</Label>
            <Input 
              value={data.country} 
              onChange={(e) => onChange('country', e.target.value)} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
