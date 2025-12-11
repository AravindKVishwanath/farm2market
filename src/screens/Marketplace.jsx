import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import { Plus, ShoppingBag, Tag, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Marketplace = () => {
  const navigate = useNavigate();
  const { listings } = useMarketplace();

  return (
    <div className="p-6 pb-24">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-nature-900">Marketplace</h2>
          <p className="text-sm text-gray-500">Fresh produce, AI Graded</p>
        </div>
        <button 
          onClick={() => navigate('/market/create')}
          className="bg-nature-600 text-white p-3 rounded-full shadow-lg hover:bg-nature-700 transition"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="grid gap-6">
        {listings.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate(`/market/${item.id}`)}
            className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 cursor-pointer hover:shadow-lg transition"
          >
            <div className="h-40 bg-gray-200 relative">
              <img src={item.photo} alt={item.product} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-nature-800 flex items-center gap-1">
                <Award className="w-3 h-3 text-yellow-500" /> Grade {item.grade}
              </div>
              {item.status !== 'OPEN' && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="bg-white text-black px-4 py-2 rounded-lg font-bold uppercase tracking-wider text-sm">
                    {item.status}
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{item.product}</h3>
                  <p className="text-sm text-gray-500">{item.farmer}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-nature-700">₹{item.price}</p>
                  <p className="text-xs text-gray-400">per kg</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1">
                  <ShoppingBag className="w-4 h-4" /> {item.quantity}
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4" /> Floor: ₹{Math.floor(item.price * 0.9)}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
