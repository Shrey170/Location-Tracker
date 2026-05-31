import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Accept from './pages/Accept';
import Track from './pages/Track';
import { io } from 'socket.io-client';

// We can just establish a single socket connection to our backend
// Note: In development the backend might be on a different port (e.g. 5000), we should proxy it or set the URL directly.
export const socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000');

function App() {
  return (
    <Router>
      <div className="flex items-center justify-center min-h-screen p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accept.html" element={<Accept />} />
          <Route path="/track.html" element={<Track />} />
          <Route path="/accept" element={<Accept />} />
          <Route path="/track" element={<Track />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
