'use client';

import { Input, Label } from '../ui/input';

interface BillFromSectionProps {
  initialData?: any;
}

export default function BillFromSection({ initialData }: BillFromSectionProps) {
  return (
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
  );
}
