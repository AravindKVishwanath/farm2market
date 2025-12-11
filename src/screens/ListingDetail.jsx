import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import { ShieldCheck, Truck, CheckCircle, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { listings, placeBid, updateStatus } = useMarketplace();
  const listing = listings.find(l => l.id === id);

  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');

  if (!listing) return <div className="p-6">Listing not found</div>;

  const handleBid = () => {
    try {
      placeBid(listing.id, Number(bidAmount), 'Buyer #1');
      setBidAmount('');
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const steps = [
    { status: 'OPEN', label: 'Listed', icon: ShieldCheck },
    { status: 'ESCROW', label: 'Escrow', icon: Lock },
    { status: 'IN_TRANSIT', label: 'Transit', icon: Truck },
    { status: 'DELIVERED', label: 'Delivered', icon: CheckCircle },
  ];

  const currentStepIndex = steps.findIndex(s => s.status === listing.status);

  return (
    <div className="pb-24">
      <div className="h-64 bg-gray-200 relative">
        <img src={listing.photo} alt={listing.product} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">{listing.product}</h1>
            <p className="text-white/80">{listing.farmer} • {listing.quantity}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Smart Contract Status */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Smart Contract Status</h3>
          <div className="flex justify-between relative">
            {/* Progress Bar Background */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10 -translate-y-1/2"></div>
            {/* Active Progress */}
            <div 
              className="absolute top-1/2 left-0 h-1 bg-nature-500 -z-10 -translate-y-1/2 transition-all duration-500"
              style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
            ></div>

            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx <= currentStepIndex;
              return (
                <div key={step.status} className="flex flex-col items-center gap-2 bg-white px-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                    isActive ? 'bg-nature-500 border-nature-500 text-white' : 'bg-white border-gray-200 text-gray-300'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-bold ${isActive ? 'text-nature-700' : 'text-gray-300'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bidding Section */}
        {listing.status === 'OPEN' ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm text-gray-500">Current Price</p>
                <p className="text-3xl font-bold text-nature-900">₹{listing.price}</p>
              </div>
              <div className="text-right">
                 <p className="text-sm text-gray-500">Grade</p>
                 <p className="text-xl font-bold text-nature-600">{listing.grade}</p>
              </div>
            </div>

            <div className="space-y-3">
              <input 
                type="number"
                value={bidAmount}
                onChange={e => setBidAmount(e.target.value)}
                placeholder={`Min Bid: ₹${Math.floor(listing.price * 0.9)}`}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-nature-500 outline-none text-lg"
              />
              {error && <p className="text-red-500 text-sm flex items-center gap-1"><AlertCircle className="w-4 h-4"/> {error}</p>}
              
              <button 
                onClick={handleBid}
                className="w-full bg-nature-700 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-nature-800 transition"
              >
                Place Bid & Lock Funds
              </button>
              <p className="text-xs text-center text-gray-400">Funds will be held in Polygon Smart Contract Escrow</p>
            </div>
          </div>
        ) : (
          <div className="bg-nature-50 border border-nature-200 rounded-2xl p-6 text-center">
            <Lock className="w-12 h-12 text-nature-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-nature-900 mb-1">Funds in Escrow</h3>
            <p className="text-nature-700 mb-6">Waiting for logistics confirmation.</p>
            
            {/* Simulation Controls */}
            {listing.status === 'ESCROW' && (
              <button onClick={() => updateStatus(listing.id, 'IN_TRANSIT')} className="w-full bg-white border border-nature-200 text-nature-700 py-3 rounded-xl font-bold">
                Simulate: Pickup (Logistics)
              </button>
            )}
            {listing.status === 'IN_TRANSIT' && (
              <button onClick={() => updateStatus(listing.id, 'DELIVERED')} className="w-full bg-white border border-nature-200 text-nature-700 py-3 rounded-xl font-bold">
                Simulate: Delivery (Oracle)
              </button>
            )}
            {listing.status === 'DELIVERED' && (
              <div className="text-green-600 font-bold flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" /> Contract Settled
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingDetail;
