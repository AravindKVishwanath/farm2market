import React, { useState } from 'react';
import { useBlockchain } from '../context/BlockchainContext';
import { CheckCircle, AlertTriangle, Share2, QrCode, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { QRCodeCanvas } from 'qrcode.react';
import CryptoJS from 'crypto-js';

const Trace = () => {
  const { blockchain, tamperWithData, resetChain } = useBlockchain();
  const [showQR, setShowQR] = useState(null);

  // Helper to verify integrity locally for display
  const verifyBlock = (block, prevHash) => {
    const rawString = `${block.index}${block.timestamp}${JSON.stringify(block.data)}${prevHash}`;
    const calculated = CryptoJS.SHA256(rawString).toString();
    return calculated === block.hash;
  };

  let isChainValid = true;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-nature-900">Product Journey</h2>
        <div className="flex gap-2">
            <button onClick={tamperWithData} className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded">Tamper</button>
            <button onClick={resetChain} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"><Trash2 className="w-4 h-4"/></button>
        </div>
      </div>

      <div className="relative border-l-2 border-nature-200 ml-4 space-y-8 pb-8">
        {blockchain.chain.map((block, index) => {
          // Check validity relative to previous block
          const prevHash = index === 0 ? "0" : blockchain.chain[index - 1].hash;
          const isValid = verifyBlock(block, prevHash);
          if (!isValid) isChainValid = false;

          return (
            <motion.div 
              key={block.index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8"
            >
              {/* Timeline Dot */}
              <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${isValid && isChainValid ? 'bg-nature-500' : 'bg-red-500'}`}></div>

              {/* Card */}
              <div className={`bg-white p-5 rounded-xl shadow-md border-l-4 ${isValid && isChainValid ? 'border-nature-500' : 'border-red-500'}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide ${
                    block.data.role === 'Farmer' ? 'bg-green-100 text-green-700' :
                    block.data.role === 'Transporter' ? 'bg-blue-100 text-blue-700' :
                    block.data.role === 'System' ? 'bg-gray-100 text-gray-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {block.data.role}
                  </span>
                  <span className="text-xs text-gray-400">{new Date(block.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>

                <h3 className="font-bold text-gray-800 text-lg mb-1">{block.data.product}</h3>
                
                {block.data.location && (
                  <p className="text-sm text-gray-600 mb-1">📍 {block.data.location}</p>
                )}
                {block.data.quantity && (
                  <p className="text-sm text-gray-600 mb-1">📦 {block.data.quantity}</p>
                )}

                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <div className="flex items-center gap-1 text-xs">
                    {isValid && isChainValid ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-nature-600" />
                        <span className="text-nature-600 font-medium">Verified</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <span className="text-red-500 font-medium">Compromised</span>
                      </>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => setShowQR(block)}
                    className="text-nature-600 hover:bg-nature-50 p-2 rounded-full transition-colors"
                  >
                    <QrCode className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Hash Display (Truncated) */}
                <div className="mt-2 text-[10px] text-gray-400 font-mono truncate">
                  Hash: {block.hash}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* QR Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setShowQR(null)}>
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm text-center" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Block #{showQR.index} Data</h3>
            <div className="bg-white p-4 rounded-xl shadow-inner inline-block mb-4 border border-gray-200">
              <QRCodeCanvas 
                value={JSON.stringify(showQR)} 
                size={200}
                level={"H"}
                includeMargin={true}
              />
            </div>
            <p className="text-sm text-gray-500 mb-6">Scan to verify this block's data integrity.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowQR(null)}
                className="flex-1 py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-xl"
              >
                Close
              </button>
              <button className="flex-1 py-3 bg-nature-600 text-white font-medium rounded-xl shadow-lg flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trace;
