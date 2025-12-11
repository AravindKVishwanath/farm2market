import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import { simulateAIGrading } from '../utils/aiSimulator';
import { Camera, Loader2, CheckCircle, TrendingUp, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const CreateListing = () => {
  const navigate = useNavigate();
  const { createListing } = useMarketplace();
  
  const [step, setStep] = useState(1); // 1: Input, 2: Analyzing, 3: Review
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  
  const [formData, setFormData] = useState({
    product: '',
    quantity: '',
    expectedPrice: '',
    photo: null
  });

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setStep(2);
    setLoading(true);
    
    const result = await simulateAIGrading(formData);
    
    setAiResult(result);
    setLoading(false);
    setStep(3);
  };

  const handlePublish = () => {
    createListing({
      ...formData,
      photo: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&q=80&w=400', // Mock photo
      grade: aiResult.grade,
      price: aiResult.pricing.suggested,
      aiAnalysis: aiResult
    });
    navigate('/market');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-nature-900 mb-6">New Listing</h2>

      {step === 1 && (
        <motion.form 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          onSubmit={handleAnalyze} 
          className="space-y-5"
        >
          <div className="bg-gray-100 h-40 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 cursor-pointer hover:bg-gray-50 transition">
            <Camera className="w-8 h-8 mb-2" />
            <span className="text-sm">Upload Product Photos</span>
            <span className="text-xs text-gray-400 mt-1">(Required for AI Grading)</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input 
              required
              value={formData.product}
              onChange={e => setFormData({...formData, product: e.target.value})}
              className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-nature-500 outline-none"
              placeholder="e.g. Kashmiri Apples"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input 
                required
                value={formData.quantity}
                onChange={e => setFormData({...formData, quantity: e.target.value})}
                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-nature-500 outline-none"
                placeholder="100kg"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Exp. Price (₹)</label>
              <input 
                required
                type="number"
                value={formData.expectedPrice}
                onChange={e => setFormData({...formData, expectedPrice: e.target.value})}
                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-nature-500 outline-none"
                placeholder="20"
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-nature-700 text-white py-4 rounded-xl font-bold shadow-lg mt-4">
            Analyze Quality (AI)
          </button>
        </motion.form>
      )}

      {step === 2 && (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Loader2 className="w-12 h-12 text-nature-600 animate-spin mb-4" />
          <h3 className="text-lg font-bold text-gray-800">AI is analyzing your produce...</h3>
          <p className="text-sm text-gray-500 mt-2">Checking color, size, and defects.</p>
        </div>
      )}

      {step === 3 && aiResult && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-nature-50 border border-nature-200 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-nature-900">AI Quality Report</h3>
              <span className="bg-nature-600 text-white px-3 py-1 rounded-full text-sm font-bold">Grade {aiResult.grade}</span>
            </div>
            
            <ul className="space-y-2 mb-6">
              {aiResult.analysis.map((line, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-nature-800">
                  <CheckCircle className="w-4 h-4 text-nature-600" /> {line}
                </li>
              ))}
            </ul>

            <div className="bg-white p-4 rounded-xl border border-nature-100">
              <div className="flex items-center gap-2 mb-3 text-nature-700 font-medium">
                <TrendingUp className="w-4 h-4" /> Pricing Recommendation
              </div>
              <div className="flex justify-between text-center">
                <div>
                  <div className="text-xs text-gray-500">Floor</div>
                  <div className="font-bold text-gray-700">₹{aiResult.pricing.floor}</div>
                </div>
                <div className="scale-110">
                  <div className="text-xs text-nature-600 font-bold">Suggested</div>
                  <div className="font-bold text-nature-700 text-lg">₹{aiResult.pricing.suggested}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Ceiling</div>
                  <div className="font-bold text-gray-700">₹{aiResult.pricing.ceiling}</div>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={handlePublish}
            className="w-full bg-nature-700 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-nature-800 transition"
          >
            Mint to Blockchain & List
          </button>
          <button 
            onClick={() => setStep(1)}
            className="w-full text-gray-500 py-4 mt-2 font-medium"
          >
            Edit Details
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default CreateListing;
