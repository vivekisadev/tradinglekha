import React from "react";
import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "h-9 md:h-11 w-auto" }: { className?: string }) {
  return (
    <div className="flex items-center">
      <Image 
        src="/images/logo.png" 
        alt="Tradinglekha Logo" 
        width={300} 
        height={70} 
        className={`object-contain ${className}`}
        priority
      />
    </div>
  );
}

export function LogoLink({ className = "h-9 md:h-11 w-auto" }: { className?: string }) {
  return (
    <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
      <Image 
        src="/images/logo.png" 
        alt="Tradinglekha Logo" 
        width={300} 
        height={70} 
        className={`object-contain ${className}`}
        priority
      />
    </Link>
  );
}
