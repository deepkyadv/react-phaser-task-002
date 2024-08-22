import React, { useRef, useState, useEffect } from 'react';
import io from 'socket.io-client';
import Game from './Game';
import './App.css';

const socket = io('http://localhost:3000');

function AdminPage() {
  const gameRef = useRef(null);
  const [pressedButtons, setPressedButtons] = useState([]);

  useEffect(() => {
    socket.on('buttonPress', (button) => {
      setPressedButtons((prev) => [...prev, button]);
    });

    return () => {
      socket.off('buttonPress');
    };
  }, []);

  const handleButtonPress = (button, label) => {
    gameRef.current.moveBall(button);
    socket.emit('buttonPress', label); // Emit event to server with button label
  };

  return (
    <div className="app-container">
      <div className="button-container top">
        <button onClick={() => handleButtonPress('up1', 'Button 1 (Up)')}>Button 1 (Up)</button>
        <button onClick={() => handleButtonPress('up2', 'Button 2 (Up)')}>Button 2 (Up)</button>
      </div>
      <div className="middle-container">
        <div className="button-container left">
          <button onClick={() => handleButtonPress('left1', 'Button 3 (Left)')}>Button 3 (Left)</button>
          <button onClick={() => handleButtonPress('left2', 'Button 4 (Left)')}>Button 4 (Left)</button>
        </div>
        <div className="game-container">
          <Game ref={gameRef} />
        </div>
        <div className="button-container right">
          <button onClick={() => handleButtonPress('right1', 'Button 5 (Right)')}>Button 5 (Right)</button>
          <button onClick={() => handleButtonPress('right2', 'Button 6 (Right)')}>Button 6 (Right)</button>
        </div>
      </div>
      <div className="button-container bottom">
        <button onClick={() => handleButtonPress('down1', 'Button 7 (Down)')}>Button 7 (Down)</button>
        <button onClick={() => handleButtonPress('down2', 'Button 8 (Down)')}>Button 8 (Down)</button>
      </div>
      <div className="pressed-buttons">
        <h3>Pressed Buttons:</h3>
        <p>{pressedButtons.join(', ')}</p>
      </div>
    </div>
  );
}

export default AdminPage;
