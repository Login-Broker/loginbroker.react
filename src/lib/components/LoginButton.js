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

function getCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  return name + "=" + encodeURIComponent(JSON.stringify(value)) + ";expires=" + expires.toUTCString() + ";path=/";
}

function LoginButton({ platform, handleLogin }) {
  const [sessionId, setSessionId] = useState(generateRandomString(15));
  
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
              } else {
                handleLogin(getCookie("authToken", data, 1000), "https://login.broker/account");
              }
            })
        } else if (data === 'pending') {
          setTimeout(confirmLogin, 2000); // Check again after 2 seconds
        } else if (data === 'failed') {
          console.log('Login failed. Try again');
        } else {
          console.log('Unknown issue');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleButtonClick = () => {
    const newSessionId = generateRandomString(15);
    setSessionId(newSessionId);
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

export default LoginButton;