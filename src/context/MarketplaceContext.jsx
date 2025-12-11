import React, { createContext, useContext, useState } from 'react';
import { useBlockchain } from './BlockchainContext';

const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
  const { addBlock } = useBlockchain();
  
  // Mock Database of Listings
  const [listings, setListings] = useState([
    {
      id: '1',
      farmer: 'Farmer John',
      product: 'Organic Mangoes',
      quantity: '100kg',
      photo: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=400',
      grade: 'A',
      price: 20,
      status: 'OPEN', // OPEN, ESCROW, DELIVERED, SETTLED
      bids: []
    }
  ]);

  const createListing = (listingData) => {
    const newListing = {
      id: Date.now().toString(),
      status: 'OPEN',
      bids: [],
      ...listingData
    };
    setListings([newListing, ...listings]);
    
    // Record on Blockchain
    addBlock({
      role: 'System',
      product: listingData.product,
      action: 'LISTING_CREATED',
      contractAddress: `0x${Math.random().toString(16).slice(2, 10)}...`,
      data: `Listed ${listingData.quantity} at ₹${listingData.price}/kg`
    });
  };

  const placeBid = (listingId, amount, bidderName) => {
    setListings(prev => prev.map(item => {
      if (item.id === listingId) {
        // Smart Contract Logic Simulation
        if (amount < item.price) {
          throw new Error(`Bid rejected: Below floor price of ₹${item.price}`);
        }
        
        // If Buy Now or High Bid accepted (simplified)
        const updatedItem = {
          ...item,
          status: 'ESCROW',
          highestBid: amount,
          buyer: bidderName
        };

        // Record Escrow Lock on Blockchain
        addBlock({
          role: 'SmartContract',
          product: item.product,
          action: 'ESCROW_LOCKED',
          data: `Funds ₹${amount} locked in contract. Waiting for delivery.`
        });

        return updatedItem;
      }
      return item;
    }));
  };

  const updateStatus = (listingId, newStatus) => {
    setListings(prev => prev.map(item => {
      if (item.id === listingId) {
        addBlock({
          role: 'SmartContract',
          product: item.product,
          action: newStatus,
          data: `State changed to ${newStatus}. Oracle verified.`
        });
        return { ...item, status: newStatus };
      }
      return item;
    }));
  };

  return (
    <MarketplaceContext.Provider value={{ listings, createListing, placeBid, updateStatus }}>
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => useContext(MarketplaceContext);
