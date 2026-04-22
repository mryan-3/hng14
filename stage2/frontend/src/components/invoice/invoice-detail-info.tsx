'use client';

interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

interface InvoiceDetailInfoProps {
  id: string;
  description: string;
  senderAddress: Address;
  clientAddress: Address;
  clientName: string;
  clientEmail: string;
  createdAt: string;
  dueDate: string;
}

export default function InvoiceDetailInfo({ 
  id, description, senderAddress, clientAddress, clientName, clientEmail, createdAt, dueDate 
}: InvoiceDetailInfoProps) {
  return (
    <div className="bg-white dark:bg-secondary-dark p-6 md:p-8 lg:p-12 rounded-lg shadow-sm flex flex-col gap-8 md:gap-11">
      <div className="flex flex-col md:flex-row md:justify-between gap-8">
        <div>
          <h1 className="text-base md:text-xl font-bold text-text-dark dark:text-white mb-2"><span className="text-text-gray">#</span>{id}</h1>
          <p className="text-sm font-medium text-text-gray dark:text-text-gray-light">{description}</p>
        </div>
        <div className="text-sm font-medium text-text-gray dark:text-text-gray-light text-left md:text-right">
          <p>{senderAddress.street}</p><p>{senderAddress.city}</p><p>{senderAddress.postCode}</p><p>{senderAddress.country}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        <div className="flex flex-col justify-between gap-8">
          <div><p className="text-sm font-medium text-text-gray dark:text-text-gray-light mb-3">Invoice Date</p><p className="text-base md:text-xl font-bold text-text-dark dark:text-white">{createdAt}</p></div>
          <div><p className="text-sm font-medium text-text-gray dark:text-text-gray-light mb-3">Payment Due</p><p className="text-base md:text-xl font-bold text-text-dark dark:text-white">{dueDate}</p></div>
        </div>
        <div>
          <p className="text-sm font-medium text-text-gray dark:text-text-gray-light mb-3">Bill To</p><p className="text-base md:text-xl font-bold text-text-dark dark:text-white mb-3">{clientName}</p>
          <div className="text-xs md:text-sm font-medium text-text-gray dark:text-text-gray-light">
            <p>{clientAddress.street}</p><p>{clientAddress.city}</p><p>{clientAddress.postCode}</p><p>{clientAddress.country}</p>
          </div>
        </div>
        <div className="col-span-2 md:col-span-1"><p className="text-sm font-medium text-text-gray dark:text-text-gray-light mb-3">Sent to</p><p className="text-base md:text-xl font-bold text-text-dark dark:text-white break-all">{clientEmail}</p></div>
      </div>
    </div>
  );
}
