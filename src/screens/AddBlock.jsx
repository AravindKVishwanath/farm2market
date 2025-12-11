import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlockchain } from '../context/BlockchainContext';
import { Save, MapPin, Thermometer, User, Package } from 'lucide-react';

const AddBlock = () => {
  const navigate = useNavigate();
  const { addBlock } = useBlockchain();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    role: 'Farmer',
    product: '',
    location: '',
    quantity: '',
    temperature: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate network delay for blockchain mining
    setTimeout(() => {
      addBlock(formData);
      setLoading(false);
      navigate('/trace');
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-nature-900 mb-6">Add Supply Data</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Role Selection */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {['Farmer', 'Transporter', 'Retailer'].map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setFormData({...formData, role})}
              className={`py-2 px-1 rounded-lg text-sm font-medium border transition-colors ${
                formData.role === role 
                ? 'bg-nature-600 text-white border-nature-600' 
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Package className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input
              required
              name="product"
              value={formData.product}
              onChange={handleChange}
              placeholder="Product Name (e.g. Organic Mangoes)"
              className="w-full pl-10 p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-nature-500 focus:outline-none"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input
              required
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location (e.g. Farm A, Nashik)"
              className="w-full pl-10 p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-nature-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-4">
            <div className="relative flex-1">
              <input
                required
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-nature-500 focus:outline-none"
              />
            </div>
            <div className="relative flex-1">
              <Thermometer className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              <input
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                placeholder="Temp (°C)"
                className="w-full pl-10 p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-nature-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full mt-8 bg-nature-700 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-nature-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? 'Mining Block...' : (
            <>
              <Save className="w-5 h-5" />
              Submit to Blockchain
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddBlock;
