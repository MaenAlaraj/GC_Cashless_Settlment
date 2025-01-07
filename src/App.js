// src/App.jsx
import React, { useState } from 'react';
import Cashless from './Cashless';

const App = () => {
  const [showCashless, setShowCashless] = useState(false);

  const handleClick = () => {
    setShowCashless(true);
  };

  return (
    <div style={styles.container}>
      <div style={styles.label}>
        <h2>Click the button below to proceed with Cashless Payment</h2>
      </div>
      <button style={styles.button} onClick={handleClick}>Cashless</button>

      {showCashless && <Cashless />}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
  },
  label: {
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '18px',
    cursor: 'pointer',
  },
};

export default App;
