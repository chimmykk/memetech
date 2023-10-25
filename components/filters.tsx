"use client"

import React from 'react';
import { LightningBoltIcon, FireIcon, UploadIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ButtonRow = () => {

    const pathname = usePathname()

  return (
    <div className="flex justify-between text-sm items-center px-4 md:px-24 py-4">
      <div className="space-x-2 flex">
        <Link href={'/topmemes'} className={` ${pathname === '/topmemes' ? 'text-white bg-black' : 'text-black bg-white'} border  border-black px-4 py-2  flex items-center space-x-2`}>
          <LightningBoltIcon className="w-5 h-5" />
          Top Memes
        </Link>
        <Link href={'/new'} className={` ${pathname === '/new' ? 'text-white bg-black' : 'text-black bg-white'} border  border-black px-4 py-2  flex items-center space-x-2`}> 
          <FireIcon className="w-5 h-5" />
          New Memes
        </Link>
         <input
          type="text"
          placeholder="Search memes"
          className="border border-black px-4 py-2  text-black"
        />
      </div>
      <Link href={'/submit'} className="  text-black border border-black px-4 py-2  flex items-center space-x-2">
        <UploadIcon className="w-6 h-6" />
        Submit Memes
      </Link>
      
    </div>
  );
};

export default ButtonRow;
