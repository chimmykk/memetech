"use client"
import React, { useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { NFTStorage, File } from 'nft.storage';
import { ethers } from 'ethers';

const nftStorage = new NFTStorage({
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQwNDA3NzY4RDU5MWMyNGNiOGRhMzljOTA2MjUxYWQ2RWE5NzdFYTQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5ODI2NjIxOTgyNywibmFtZSI6Im1lbWV0ZWNoIn0.qsxIVSmWC5RldmAJWZ1ODEUp9-_TkDwf7kNIw6yvPuc', // Replace with your NFT.storage token
});

const contractAddress = '0xf5fdD8C1BD4A3E936B9CE8bC3a324333064fe6a2'; // Replace with your contract address
// Your contract ABI
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_imageID",
				"type": "uint256"
			}
		],
		"name": "buyImage",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "imageID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "supply",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "memeName",
				"type": "string"
			}
		],
		"name": "ImageListed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "imageID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "supply",
				"type": "uint256"
			}
		],
		"name": "ImagePurchased",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_ipfsHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_supply",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_memeName",
				"type": "string"
			}
		],
		"name": "listImageForSale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "imageID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newPrice",
				"type": "uint256"
			}
		],
		"name": "PriceUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_imageID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_newPrice",
				"type": "uint256"
			}
		],
		"name": "updateImagePrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_imageID",
				"type": "uint256"
			}
		],
		"name": "displayImageIPFSLink",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_imageID",
				"type": "uint256"
			}
		],
		"name": "getCurrentPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getUserBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getUserImageCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getUserImages",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "imageCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "imageNames",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "images",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "supply",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "priceIncrease",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userBalances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userImageIds",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export default function YourComponent() {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [supply, setSupply] = useState<string>('');

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  const uploadImage = async (imageFile: File) => {
    try {
      const imageBlob = new Blob([imageFile], { type: imageFile.type });

      const metadata = await nftStorage.store({
        name: title,
        description: '', // Add a description if needed
        image: new File([imageBlob], title + '.jpg', { type: 'image/jpeg' }),
      });

      return metadata.url;
    } catch (error) {
      console.error('Error uploading image to NFT.Storage:', error);
      return null;
    }
  };

  const handleSubmitMeme = async () => {
    if (!image || !title || !price || !supply) {
      alert('Please fill in all the required fields');
      return;
    }

    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const imageURL = await uploadImage(image);

        if (!imageURL) {
          alert('Failed to upload image to NFT.Storage');
          return;
        }

        // Call the 'listImageForSale' function on the contract with the required parameters
        const transaction = await contract.listImageForSale(
          imageURL,
          ethers.utils.parseUnits(price, 'ether'),
          ethers.utils.parseUnits(supply, 'wei'),
          title
        );

        // Wait for the transaction to be mined
        const receipt = await transaction.wait();

        // Check if the transaction was successful
        if (receipt.status === 1) {
          alert('Meme NFT minted successfully!');
        } else {
          alert('Failed to mint Meme NFT. Transaction failed.');
        }
      } else {
        alert('Please install and connect to a Web3 wallet (e.g., MetaMask) to use this application.');
      }
    } catch (error) {
      console.error('Error minting NFT:', error);
      alert('Failed to mint Meme NFT');
    }
  };

  useEffect(() => {
    // You can perform any necessary setup or checks here.
  }, []);

  return (
    <main className="py-12 px-32">
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

      {image && (
        <div className="w-32 my-2 rounded-lg overflow-hidden h-32 border border-red-500">
          <Image src={URL.createObjectURL(image)} alt="Uploaded" width={1000} height={1000} className="w-full rounded-lg object-center h-full" />
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
        <button onClick={handleSubmitMeme} className="text-black border border-black px-4 py-2 inline-flex items-center space-x-2 cursor-pointer mt-4">
          <span>Submit Meme</span>
        </button>
      )}
    </main>
  );
}
