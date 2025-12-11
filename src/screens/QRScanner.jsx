import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import { X, AlertCircle } from 'lucide-react';

const QRScanner = () => {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize scanner
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scanner.render(onScanSuccess, onScanFailure);

    function onScanSuccess(decodedText) {
      try {
        const data = JSON.parse(decodedText);
        setScanResult(data);
        scanner.clear();
      } catch (e) {
        setError("Invalid QR Code format. Please scan a Farm2Market code.");
      }
    }

    function onScanFailure(error) {
      // console.warn(`Code scan error = ${error}`);
    }

    return () => {
      scanner.clear().catch(error => console.error("Failed to clear scanner", error));
    };
  }, []);

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <div className="p-4 flex justify-between items-center z-10">
        <h2 className="text-lg font-bold">Scan Product QR</h2>
        <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-full">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        {!scanResult ? (
          <div id="reader" className="w-full max-w-sm overflow-hidden rounded-xl border-2 border-nature-500"></div>
        ) : (
          <div className="p-6 w-full max-w-sm">
            <div className="bg-white text-gray-900 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4 text-nature-700">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold uppercase text-sm">Blockchain Verified</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-2">{scanResult.data?.product || "Unknown Product"}</h3>
              
              <div className="space-y-3 text-sm text-gray-600 mb-6">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span>Role</span>
                  <span className="font-medium">{scanResult.data?.role}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span>Location</span>
                  <span className="font-medium">{scanResult.data?.location}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span>Timestamp</span>
                  <span className="font-medium">{new Date(scanResult.timestamp).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="bg-gray-100 p-3 rounded-lg mb-6">
                <p className="text-[10px] font-mono text-gray-500 break-all">
                  HASH: {scanResult.hash}
                </p>
              </div>

              <button 
                onClick={() => navigate('/trace')}
                className="w-full bg-nature-700 text-white py-3 rounded-xl font-bold hover:bg-nature-800 transition"
              >
                View Full History
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute bottom-10 bg-red-500/90 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}
      </div>
      
      {!scanResult && (
        <div className="p-6 text-center text-gray-400 text-sm">
          Point your camera at a Farm2Market QR code
        </div>
      )}
    </div>
  );
};

export default QRScanner;
