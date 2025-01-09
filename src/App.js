import React, { useState } from 'react';

const App = () => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleClick = () => {
    const method = 'Credit Card'; // Example payment method
    setPaymentMethod(method);

    // Call the speakText function
    speakText(`Thank you. You selected ${method} as your payment method.`);
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Clear the speech queue
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; // Set language
      utterance.volume = 1; // Volume: 0 to 1
      utterance.rate = 1; // Rate: 0.1 to 10
      utterance.pitch = 1; // Pitch: 0 to 2
      window.speechSynthesis.speak(utterance);
    } else {
      console.error('Speech synthesis is not supported in this browser.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button onClick={handleClick} style={{ fontSize: '20px', padding: '10px 20px' }}>
        Select Payment
      </button>
      {paymentMethod && <p>Selected Payment Method: {paymentMethod}</p>}
    </div>
  );
};

export default App;
