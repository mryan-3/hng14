'use client';

import { Input, Label } from '../ui/input';

interface BillToSectionProps {
  initialData?: any;
}

export default function BillToSection({ initialData }: BillToSectionProps) {
  return (
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
  );
}
