"use client"
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function Navbar() {
  const [web3, setWeb3] = useState<Web3 | undefined>(undefined);
  const [walletAddress, setWalletAddress] = useState<string>('');

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      setWeb3(new Web3(window.ethereum));
    }
  }, []);

  const connectWallet = async () => {
    if (web3) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setWalletAddress(accounts[0]);
        console.log('Connected to wallet!');
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Metamask not installed!');
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    console.log('Disconnected wallet!');
  };

  return (
    <nav className="px-4 md:px-32 bg-orange-400 py-2 flex justify-between items-center">
      <h1>meme.tech</h1>
      {walletAddress ? (
        <div>
          <p>{walletAddress}</p>
          <button className="border border-black p-1" onClick={disconnectWallet}>
            Disconnect
          </button>
        </div>
      ) : (
        <button className="border border-black p-1" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </nav>
  );
}