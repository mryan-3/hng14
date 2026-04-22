'use client';

import { Input, Label, Select } from '@/components/ui/input';

interface PaymentDetailsSectionProps {
  initialData?: any;
}

export default function PaymentDetailsSection({ initialData }: PaymentDetailsSectionProps) {
  return (
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
  );
}
