'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function UserAvatar() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="flex items-center justify-center w-20 h-20 lg:w-full lg:h-[103px] lg:mt-2">
      <div className="relative w-8 h-8 rounded-full overflow-hidden lg:w-10 lg:h-10 border border-transparent hover:border-primary-purple transition-colors cursor-pointer">
        {mounted && (
          <Image 
            src="/vercel.svg" 
            alt="User Avatar" 
            fill
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
}
