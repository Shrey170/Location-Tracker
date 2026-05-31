import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

function Accept() {
  const [searchParams] = useSearchParams();
  const requestId = searchParams.get('id');
  
  const [status, setStatus] = useState('Waiting for acceptance...');
  const [isSharing, setIsSharing] = useState(false);
  const locationInterval = useRef(null);

  const acceptRequest = async () => {
    if (!requestId) {
      setStatus('❌ Missing request ID in URL.');
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/location/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId }),
      });
      
      const data = await response.json();
      if (data.message === 'Request accepted') {
        setStatus('✅ Request accepted. Requesting location permission...');
        if ('geolocation' in navigator) {
          startSharingLocation(requestId);
        } else {
          setStatus('❌ Geolocation is not supported by your browser.');
        }
      } else {
        setStatus('❌ Error accepting request.');
      }
    } catch (err) {
      console.error('Error:', err.message);
      setStatus('❌ Server error.');
    }
  };

  const sendLocation = async (latitude, longitude, reqId) => {
    try {
      const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      await fetch(`${apiUrl}/api/location/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId: reqId, latitude, longitude }),
      });
    } catch (err) {
      console.error('Error sending location:', err.message);
    }
  };

  const startSharingLocation = (reqId) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        sendLocation(position.coords.latitude, position.coords.longitude, reqId);
        setIsSharing(true);
        setStatus('✅ Location is being shared live.');

        locationInterval.current = setInterval(() => {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              sendLocation(pos.coords.latitude, pos.coords.longitude, reqId);
            },
            (err) => {
              console.error('Repeated location error:', err.message);
              setStatus('❌ Failed to fetch live location.');
            }
          );
        }, 5000);
      },
      (error) => {
        console.error('Location error:', error);
        let errMsg = '❌ Location access denied or unavailable.';
        if (window.isSecureContext === false) {
          errMsg = '❌ Geolocation requires HTTPS or localhost. If you are using an IP address, the browser will block location access.';
        } else if (error.code === 1) {
          errMsg = '❌ Permission denied. You must allow location access in your browser.';
        }
        setStatus(errMsg);
      }
    );
  };

  const stopSharing = () => {
    if (locationInterval.current) {
      clearInterval(locationInterval.current);
      locationInterval.current = null;
    }
    setIsSharing(false);
    setStatus('🛑 Location sharing stopped.');
  };

  useEffect(() => {
    return () => {
      if (locationInterval.current) {
        clearInterval(locationInterval.current);
      }
    };
  }, []);

  return (
    <div className="glass-container text-center">
      <h2 className="text-2xl font-bold mb-6 text-white">📍 Accept Tracking Request</h2>
      
      {!isSharing ? (
        <button className="primary" onClick={acceptRequest}>
          ✅ Accept Request
        </button>
      ) : (
        <button className="bg-red-500 hover:bg-red-600 w-full p-3 mb-3 rounded-lg font-bold text-white shadow-lg transition-all transform hover:scale-105 active:scale-95" onClick={stopSharing}>
          🛑 Stop Sharing
        </button>
      )}

      <div className="mt-6 text-gray-200">
        {status}
      </div>
    </div>
  );
}

export default Accept;
