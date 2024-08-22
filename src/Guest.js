import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:3000');

function GuestPage() {
  const [pressedButtons, setPressedButtons] = useState([]);

  useEffect(() => {
    socket.on('buttonPress', (button) => {
      setPressedButtons((prev) => [...prev, button]);
    });

    return () => {
      socket.off('buttonPress');
    };
  }, []);

  return (
    <div className="app-container">
      <div className="pressed-buttons">
        <h3>Pressed Buttons:</h3>
        <p>{pressedButtons.join(', ')}</p>
      </div>
    </div>
  );
}

export default GuestPage;
