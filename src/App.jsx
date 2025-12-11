import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BlockchainProvider } from './context/BlockchainContext';
import { MarketplaceProvider } from './context/MarketplaceContext';
import Layout from './components/Layout';
import Welcome from './screens/Welcome';
import Dashboard from './screens/Dashboard';
import AddBlock from './screens/AddBlock';
import Trace from './screens/Trace';
import QRScanner from './screens/QRScanner';
import Marketplace from './screens/Marketplace';
import CreateListing from './screens/CreateListing';
import ListingDetail from './screens/ListingDetail';

function App() {
  return (
    <BlockchainProvider>
      <MarketplaceProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add" element={<AddBlock />} />
              <Route path="/trace" element={<Trace />} />
              <Route path="/market" element={<Marketplace />} />
              <Route path="/market/create" element={<CreateListing />} />
              <Route path="/market/:id" element={<ListingDetail />} />
            </Route>
            <Route path="/scan" element={<QRScanner />} />
          </Routes>
        </BrowserRouter>
      </MarketplaceProvider>
    </BlockchainProvider>
  );
}

export default App;
