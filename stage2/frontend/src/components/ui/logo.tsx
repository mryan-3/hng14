'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link
      href="/"
      className="relative flex items-center justify-center w-20 h-20 bg-primary-purple rounded-r-[20px] lg:w-[103px] lg:h-[103px] group overflow-hidden"
    >
      {/* Background rectangle */}
      <div className="absolute top-0 left-0 w-full h-[103px]">
        <Image
          src="/logo-rect.svg"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Logo mark */}
      <div className="relative z-10 w-[28px] h-[26px] md:w-[40px] md:h-[37px]">
        <Image
          src="/logo-in.svg"
          alt="Invoice App Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
}
