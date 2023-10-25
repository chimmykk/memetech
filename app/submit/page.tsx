"use client"

import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';

export default function () {
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [supply, setSupply] = useState<string>('');

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  return (
    <main className="py-12 px-32">
      {!image ? (
        <label
          htmlFor="imageUpload"
          className="text-black border border-black px-4 py-2 inline-flex items-center space-x-2 cursor-pointer"
        >
          <span>Select Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            id="imageUpload"
          />
        </label>
      ) : (
        <div className="w-32 my-2 rounded-lg overflow-hidden h-32 border border-red-500">
          <Image src={image} alt="Uploaded" width={1000} height={1000} className="w-full rounded-lg object-center h-full" />
        </div>
      )}

      {image && (
        <div className="mt-4">
          <label className="text-black">Name of the meme</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-black px-4 py-2"
          />
        </div>
      )}

      {image && (
        <div className="mt-4">
          <label className="text-black">Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-black px-4 py-2"
          />
        </div>
      )}
      {image && (
        <div className="mt-4">
          <label className="text-black">Supply</label>
          <input
            type="text"
            value={supply}
            onChange={(e) => setSupply(e.target.value)}
            className="border border-black px-4 py-2"
          />
        </div>
      )}

      {image && (
        <button className="text-black border border-black px-4 py-2 inline-flex items-center space-x-2 cursor-pointer mt-4">
          <span>Submit Meme</span>
        </button>
      )}
    </main>
  );
}
