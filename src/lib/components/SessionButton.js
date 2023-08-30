import React, { useState, useEffect } from 'react';
import './styles.css';

const generateRandomString = (length) => {
  const allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    const randomChar = allowedChars.charAt(randomIndex);
    randomString += randomChar;
  }

  return randomString;
};

// function prepareSessionID(name, value, days) {
//   const expires = new Date();
//   expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
//   document.cookie = name + "=" + encodeURIComponent(JSON.stringify(value)) + ";expires=" + expires.toUTCString() + ";path=/";
//   return document.cookie;
// }

function SessionButton({ platform, onSessionReceived, onErrorReceived }) {
  const [sessionId, setSessionId] = useState(null);
  
  const confirmLogin = () => {
    // Implement the login logic here, similar to your login function
    fetch(`https://api.login.broker/loginbroker/auth/status/${sessionId}`)
      .then(response => response.text()) // Read response as text
      .then(data => {
        if (data === 'completed') {
          const loginUrl = `https://api.login.broker/account/login/${sessionId}`;
          fetch(loginUrl)
            .then(response => response.json())
            .then(data => {
              if (data.errorType) {
                console.log(data.errorType);
                onErrorReceived(data.errorType);
              } else {
                onSessionReceived(sessionId);
              }
            })
        } else if (data === 'pending') {
          setTimeout(confirmLogin, 2000); // Check again after 2 seconds
        } else if (data === 'failed') {
          console.log('Login failed. Try again');
          onErrorReceived(data);
        } else {
          console.log('Unknown issue');
          onErrorReceived(data);
        }
      })
      .catch(error => {
        console.error(error);
        onErrorReceived(error);
      });
  };

  const handleButtonClick = () => {
    setSessionId(generateRandomString(15));
  };

  useEffect(() => {
    if (sessionId) {
      // Start the login process when sessionId is available
      window.open('https://' + platform + '.login.broker/loginbroker/auth/' + platform + '/session/' + sessionId);
      setTimeout(confirmLogin, 5000);
    }
  }, [sessionId, platform, confirmLogin]);

  return (
    <button className={`login-broker-button login-broker-${platform}-button`} onClick={handleButtonClick}>
      <i className={`fab fa-${platform}`}></i>
      Login with {platform}
    </button>
  );
}

export default SessionButton;