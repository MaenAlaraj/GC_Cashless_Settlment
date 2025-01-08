// src/App.jsx
import React, { useState } from 'react';
import Cashless from './Cashless';

const App = () => {
  const [cashlessActive, setCashlessActive] = useState(false);

  const handleClick = async () => {
    console.log("[App.js]:「Cashless」ボタンがクリックされました。");

    try {
      // Invoke the Android interface method
      const resultJsonString = await window.GC_CashlessInterface.get_GCCashless();

      // Log the result
      console.log("[App.js]: Cashless Method data is received:", resultJsonString);

      // Reset the state to allow future calls
      setCashlessActive(false);
    } catch (error) {
      console.error("[App.js]: Error calling get_GCCashless:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.label}>
        <h2>以下のボタンをクリックしてキャッシュレス決済を進めてください</h2>
      </div>
      <button
        style={styles.button}
        onClick={() => {
          // Ensure the state is ready for a new interaction
          setCashlessActive(true);
          handleClick();
        }}
      >
        キャッシュレス決済
      </button>

      {cashlessActive && <div>Cashless interaction is active</div>}
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
