import React, { useState } from 'react';

const App = () => {
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

      // Convert text into voice
      const message = `受け取ったキャッシュレス決済方法: ${retPaymentMethodType}. Thank you.`;
      speakText(message);
    } catch (error) {
      console.error("[App.js]: Error calling get_GCCashless:", error);
    } finally {
      setIsCalling(false); // Allow further calls
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("[App.js]: Text-to-speech is not supported in this browser.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.label}>
        <h2>以下のボタンをクリックしてキャッシュレス決済を進めてください</h2>
      </div>
      <button
        style={styles.button}
        onClick={handleClick}
      >
        キャッシュレス決済
      </button>

      {/* Display the returned value or fallback text */}
      <div style={styles.result}>
        {paymentMethod
          ? <p>受け取ったキャッシュレス決済方法: {paymentMethod}</p>
          : <p>まだキャッシュレス決済方法が取得されていません。</p>}
      </div>
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
  result: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#333',
  },
};

export default App;
