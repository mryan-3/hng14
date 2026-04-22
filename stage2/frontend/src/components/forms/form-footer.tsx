'use client';

import Button from '../ui/button';

interface FormFooterProps {
  initialData?: any;
  onClose: () => void;
}

export default function FormFooter({ initialData, onClose }: FormFooterProps) {
  return (
    <div className="sticky bottom-0 left-0 w-full p-8 md:p-14 bg-white dark:bg-background-dark shadow-[0_-10px_20px_rgba(0,0,0,0.05)] rounded-t-[20px] md:rounded-none">
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
  );
}
