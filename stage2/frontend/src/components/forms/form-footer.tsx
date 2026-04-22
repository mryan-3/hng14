'use client';

import Button from '../ui/button';

interface FormFooterProps {
  initialData?: any;
  onClose: () => void;
}

export default function FormFooter({ initialData, onClose }: FormFooterProps) {
  const isEdit = !!initialData;

  return (
    <div className="sticky bottom-0 left-0 w-full p-6 md:px-14 md:py-8 bg-white dark:bg-background-dark shadow-[0_-10px_20px_rgba(0,0,0,0.05)] md:shadow-none z-10">
      <div className="flex items-center justify-between w-full">
        {isEdit ? (
          <div className="flex justify-end gap-2 w-full">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </div>
        ) : (
          <>
            <Button variant="secondary" onClick={onClose}>
              Discard
            </Button>
            <div className="flex items-center gap-2">
              <Button type="button" variant="dark">
                Save as Draft
              </Button>
              <Button variant="primary" type="submit">
                Save & Send
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
