import { useState, useEffect } from 'react';

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

export default function useLoginBroker(tenantName, platform, onSessionReceived, onErrorReceived) {
  const [sessionId, setSessionId] = useState(null);

  const confirmLogin = () => {
    fetchStatus();
  };

  const fetchStatus = () => {
    fetch(`https://api.login.broker/${tenantName}/auth/status/${sessionId}`)
      .then(response => response.text())
      .then(handleStatusResponse)
      .catch(handleError);
  };

  const MAX_RETRY_COUNT = 60; // Maximum retry count (2 minutes with 2-second intervals)

  let retryCount = 0; // Keep track of the number of retries
  let hasBeenPending = false;

  const handleStatusResponse = data => {
    if (data === 'completed') {
      fetchLoginData();
    } else if (data === 'failed') {
      console.log('Login failed. Try again');
      onErrorReceived(data);
    } else if (data === 'pending') {
      hasBeenPending = true;
      
      if (retryCount < MAX_RETRY_COUNT) {
        retryCount++;
        setTimeout(fetchStatus, 2000); // Retry after 2 seconds
      } else {
        console.log('Max retries reached while pending. Giving up.');
        onErrorReceived(data);
      }
      
    } else if (hasBeenPending) {
      console.log('Session expired');
      onErrorReceived(data);
    } else {
      console.log('Session not yet available');
    }
  };

  const fetchLoginData = () => {
    const loginUrl = `https://api.login.broker/account/login/${sessionId}`;
    fetch(loginUrl)
      .then(response => response.json())
      .then(handleLoginResponse)
      .catch(handleError);
  };

  const handleLoginResponse = data => {
    if (data.errorType) {
      console.log(data.errorType);
      onErrorReceived(data.errorType);
    } else {
      onSessionReceived(sessionId);
    }
  };

  const handleError = error => {
    console.error(error);
    onErrorReceived(error);
  };

  const startLoginProcess = () => {
    setSessionId(generateRandomString(15));
    window.open(`https://${platform}.login.broker/${tenantName}/auth/${platform}/session/${sessionId}`);
    setTimeout(confirmLogin, 2000);
  };

  return { startLoginProcess };
}