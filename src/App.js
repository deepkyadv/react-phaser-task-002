import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>Welcome to the Game</h1>
      <div className="link-container">
        <Link to="/admin">Admin Page</Link><br></br>
        <Link to="/guest">Guest Page</Link>
      </div>
    </div>
  );
}

export default App;
