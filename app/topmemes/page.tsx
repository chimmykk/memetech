
export default function Top() {
    return(
        <main>
            <ItemList />
        </main>
    )
}

import React from 'react';

const ItemList = () => {

const items = [
  { serialNumber: '001', memes: 'Funny Memes', supply: 'High', price: '$5.99' },
  // Add more items here
];

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      {items.map((item, index) => (
        <div key={index} className="flex justify-between items-center border-b border-gray-300 py-2">
          <div className="w-[10%] ">
            <strong>#</strong>
          </div>
          <div className="w-3/4 ">
            <strong>Memes</strong>
          </div>
          <div className="w-1/4 ">
            <strong>Supply</strong>
          </div>
          <div className="w-1/4 ">
            <strong>Price</strong>
          </div>
        </div>
      ))}
    </div>
  );
};
