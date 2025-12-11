import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BlockchainProvider } from './context/BlockchainContext';
import Layout from './components/Layout';
import Welcome from './screens/Welcome';
import Dashboard from './screens/Dashboard';
import AddBlock from './screens/AddBlock';
import Trace from './screens/Trace';
import QRScanner from './screens/QRScanner';

function App() {
  return (
    <BlockchainProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<AddBlock />} />
            <Route path="/trace" element={<Trace />} />
          </Route>
          <Route path="/scan" element={<QRScanner />} />
        </Routes>
      </BrowserRouter>
    </BlockchainProvider>
  );
}

export default App;
