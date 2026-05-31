import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { socket } from '../App';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '12px'
};

const defaultCenter = {
  lat: 0,
  lng: 0
};

function Track() {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id') || '';
  
  const [requestId, setRequestId] = useState(initialId);
  const [status, setStatus] = useState('');
  const [markerPosition, setMarkerPosition] = useState(null);
  
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const startTracking = async () => {
    if (!requestId) {
      setStatus('❌ Please enter a Request ID.');
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_BACKEND_URL || '';
      const response = await fetch(`${apiUrl}/api/location/${requestId}`);
      const data = await response.json();

      if (response.ok && data.latitude && data.longitude) {
        updateLocationOnMap(data.latitude, data.longitude);
        setStatus('✅ Tracking started. Awaiting live updates...');

        // Connect WebSocket for live updates
        socket.on(`locationUpdate-${requestId}`, (locationData) => {
          updateLocationOnMap(locationData.latitude, locationData.longitude);
        });
      } else if (data.message === "Location not available yet.") {
        setStatus('⏳ Waiting for the receiver to accept...');
      } else if (data.message === "Location not shared yet.") {
        setStatus('⏳ Receiver accepted, waiting for GPS signal...');
      } else {
        setStatus('❌ Invalid or expired tracking ID.');
      }
    } catch (err) {
      setStatus('❌ Server error.');
    }
  };

  const updateLocationOnMap = (lat, lng) => {
    const newPos = { lat, lng };
    setMarkerPosition(newPos);
    if (map) {
      map.panTo(newPos);
      map.setZoom(15);
    }
    setStatus(`📍 Updated: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
  };

  useEffect(() => {
    return () => {
      if (requestId) {
        socket.off(`locationUpdate-${requestId}`);
      }
    };
  }, [requestId]);

  return (
    <div className="glass-container dashboard-container w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">🌍 Live Tracking Dashboard</h2>

      <div className="flex gap-2 mb-4">
        <input 
          type="text" 
          placeholder="Enter Request ID" 
          value={requestId} 
          onChange={e => setRequestId(e.target.value)}
          className="flex-1 m-0 mb-0"
        />
        <button className="primary m-0 mb-0 w-auto px-6 whitespace-nowrap" onClick={startTracking}>
          🛰️ Start Tracking
        </button>
      </div>

      <div className="mb-4 text-gray-200 font-medium">
        {status}
      </div>

      <div className="w-full bg-white/5 rounded-xl border border-white/10 p-2 overflow-hidden shadow-inner">
        {loadError ? (
          <div className="text-red-400 p-4">Error loading maps. Check your API key.</div>
        ) : !isLoaded ? (
          <div className="text-gray-300 p-4">Loading maps...</div>
        ) : (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={markerPosition || defaultCenter}
            zoom={markerPosition ? 15 : 2}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              disableDefaultUI: false,
              zoomControl: true,
            }}
          >
            {markerPosition && (
              <Marker position={markerPosition} />
            )}
          </GoogleMap>
        )}
      </div>
    </div>
  );
}

export default Track;
