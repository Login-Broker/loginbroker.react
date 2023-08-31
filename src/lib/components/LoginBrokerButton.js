import React, { useState, useEffect } from 'react';
import useLoginBroker from './useLoginBroker';
import './styles.css';

function LoginBrokerButton({ tenantName, platform, onSessionReceived, onErrorReceived }) {
  const { startLoginProcess } = useLoginBroker(tenantName, platform, onSessionReceived, onErrorReceived);

  const handleSessionReceived = (sessionId) => {
    onSessionReceived(sessionId);
  };

  const handleErrorReceived = (error) => {
    onErrorReceived(error);
  };

  return (
    <button className={`login-broker-button login-broker-${platform}-button`} onClick={startLoginProcess}>
      <i className={`fab fa-${platform}`}></i>
      Login with {platform}
    </button>
  );
}

export default LoginBrokerButton;