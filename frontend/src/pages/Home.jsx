import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [link, setLink] = useState('');
  const [error, setError] = useState('');

  const sendRequest = async () => {
    if (!sender || !receiver) {
      setError('Please enter both names.');
      return;
    }
    setError('');
    
    try {
      const apiUrl = import.meta.env.VITE_BACKEND_URL || '';
      const response = await fetch(`${apiUrl}/api/location/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender, receiver }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setLink(data.link);
      } else {
        setError(data.message || 'Failed to send request');
      }
    } catch (err) {
      setError('Failed to send request: ' + err.message);
    }
  };

  const generateLink = () => {
    if (!link) return alert('Send a request first.');
    const fullLink = `${window.location.origin}/accept?id=${link}`;
    prompt('Copy this link:', fullLink);
  };

  const sendViaWhatsApp = () => {
    if (!link) return alert('Send a request first.');
    const fullLink = `${window.location.origin}/accept?id=${link}`;
    const message = `Hey! Please accept my location tracking request here: ${fullLink}`;
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="glass-container text-center">
      <h2 className="text-2xl font-bold mb-6 text-white">📍 Location Tracker</h2>
      
      <input 
        type="text" 
        placeholder="Your Name or Number" 
        value={sender} 
        onChange={e => setSender(e.target.value)}
      />
      <input 
        type="text" 
        placeholder="Receiver Name or Number" 
        value={receiver} 
        onChange={e => setReceiver(e.target.value)}
      />

      <button className="primary flex items-center justify-center gap-2" onClick={sendRequest}>
        🚀 Send Request
      </button>
      <button className="accent flex items-center justify-center gap-2" onClick={generateLink}>
        🔗 Generate Link
      </button>
      <button className="success flex items-center justify-center gap-2" onClick={sendViaWhatsApp}>
        💬 Send via WhatsApp
      </button>

      {error && <div className="text-red-400 mt-4">{error}</div>}

      {link && (
        <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="text-green-400 mb-4">✅ Request sent!</div>
          <div className="flex flex-col gap-3">
            <a 
              href={`/accept?id=${link}`} 
              target="_blank" 
              rel="noreferrer"
              className="text-blue-300 hover:text-blue-200 underline break-all"
            >
              Share this link: {window.location.origin}/accept?id={link}
            </a>
            <Link 
              to={`/track?id=${link}`}
              target="_blank"
              className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg text-center no-underline transition-colors shadow-lg"
            >
              🛰️ Track Location Here
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
