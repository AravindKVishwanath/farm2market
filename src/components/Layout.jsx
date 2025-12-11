import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, ShoppingBag } from 'lucide-react';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/dashboard' || location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      {/* Mobile Container */}
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100">
          {!isHome ? (
            <button 
              onClick={() => navigate(-1)} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-nature-700" />
            </button>
          ) : (
            <div className="w-10"></div> // Spacer
          )}
          
          <div className="flex gap-2">
            <button 
              onClick={() => navigate('/market')}
              className={`p-2 rounded-full transition-colors ${location.pathname.includes('/market') ? 'bg-nature-100 text-nature-800' : 'hover:bg-gray-100 text-nature-700'}`}
            >
              <ShoppingBag className="w-6 h-6" />
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className={`p-2 rounded-full transition-colors ${location.pathname === '/dashboard' ? 'bg-nature-100 text-nature-800' : 'hover:bg-gray-100 text-nature-700'}`}
            >
              <Home className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
