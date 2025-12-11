import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Scan, Plus, History, Search, Truck, Store, User } from 'lucide-react';
import { useBlockchain } from '../context/BlockchainContext';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();
  const { blockchain } = useBlockchain();
  const recentBlocks = blockchain.chain.slice(-3).reverse();

  return (
    <div className="p-6 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Hello, User 👋</h2>
          <p className="text-gray-500 text-sm">Track your supply chain</p>
        </div>
        <div className="w-10 h-10 bg-nature-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-nature-700" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <input 
          type="text" 
          placeholder="Enter Product ID or Scan..." 
          className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-nature-500"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/scan')}
          className="bg-nature-600 text-white p-5 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-3"
        >
          <div className="bg-white/20 p-3 rounded-full">
            <Scan className="w-6 h-6" />
          </div>
          <span className="font-semibold">Scan QR</span>
        </motion.button>

        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/add')}
          className="bg-white text-nature-700 border border-nature-100 p-5 rounded-2xl shadow-sm flex flex-col items-center justify-center gap-3"
        >
          <div className="bg-nature-50 p-3 rounded-full">
            <Plus className="w-6 h-6 text-nature-600" />
          </div>
          <span className="font-semibold">Add Data</span>
        </motion.button>
      </div>

      {/* Recent Activity */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold text-lg text-gray-800">Recent Activity</h3>
        <button onClick={() => navigate('/trace')} className="text-nature-600 text-sm font-medium">View All</button>
      </div>

      <div className="space-y-4">
        {recentBlocks.map((block, i) => (
          <motion.div 
            key={block.index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              block.data.role === 'Farmer' ? 'bg-green-100 text-green-600' :
              block.data.role === 'Transporter' ? 'bg-blue-100 text-blue-600' :
              block.data.role === 'Retailer' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
            }`}>
              {block.data.role === 'Farmer' && <User className="w-5 h-5" />}
              {block.data.role === 'Transporter' && <Truck className="w-5 h-5" />}
              {block.data.role === 'Retailer' && <Store className="w-5 h-5" />}
              {block.data.role === 'System' && <History className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">{block.data.product}</h4>
              <p className="text-xs text-gray-500">{new Date(block.timestamp).toLocaleString()}</p>
            </div>
            <div className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">
              #{block.index}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
