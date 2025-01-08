// src/App.jsx
import React, { useState } from 'react';
import Cashless from './Cashless';

const App = () => {
  const [cashlessActive, setCashlessActive] = useState(false);
  const [isCalling, setIsCalling] = useState(false); // Prevent duplicate calls
  const [paymentMethod, setPaymentMethod] = useState(""); // Store the returned value

  const handleClick = async () => {
    if (isCalling) {
      console.warn("[App.js]: Button click ignored, already calling get_GCCashless.");
      return;
    }

    setIsCalling(true); // Prevent duplicate calls

    console.log("[App.js]:「Cashless」ボタンがクリックされました。");

    try {
      // Call the Android interface method
      const retPaymentMethodType = await window.GC_CashlessInterface.get_GCCashless();
      console.log("[App.js]: Cashless Method type is received:", retPaymentMethodType);

       // Update the state with the returned value
       setPaymentMethod(retPaymentMethodType);



      // Reset the state to allow future interactions
      setCashlessActive(false);
    } catch (error) {
      console.error("[App.js]: Error calling get_GCCashless:", error);
    } finally {
      setIsCalling(false); // Allow further calls
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

    {/* Display the returned value under the button */}
    {paymentMethod && (
        <div style={styles.result}>
          <p>受け取ったキャッシュレス決済方法: {paymentMethod}</p>
        </div>
      )}
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
