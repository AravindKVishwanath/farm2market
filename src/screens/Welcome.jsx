import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-nature-50 to-nature-100 p-6 text-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-nature-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-nature-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-8"
      >
        <div className="w-24 h-24 bg-nature-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6 rotate-3">
          <Leaf className="w-12 h-12 text-white" />
          <LinkIcon className="w-6 h-6 text-white absolute bottom-4 right-4" />
        </div>
        <h1 className="text-4xl font-bold text-nature-900 mb-2 tracking-tight">Farm2Market</h1>
        <p className="text-nature-700 text-lg">Trace Your Food Origin</p>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-xs z-10"
      >
        <button 
          onClick={() => navigate('/dashboard')}
          className="w-full bg-nature-700 hover:bg-nature-800 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transform transition hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
        >
          Get Started
        </button>
        <p className="mt-4 text-sm text-nature-600">Blockchain Verified Supply Chain</p>
      </motion.div>
    </div>
  );
};

export default Welcome;
