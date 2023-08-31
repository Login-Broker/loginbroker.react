"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useLoginBroker;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.promise.js");
var _react = require("react");
const generateRandomString = length => {
  const allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    const randomChar = allowedChars.charAt(randomIndex);
    randomString += randomChar;
  }
  return randomString;
};
function useLoginBroker(tenantName, platform, onSessionReceived, onErrorReceived) {
  const [sessionId, setSessionId] = (0, _react.useState)(null);
  const confirmLogin = () => {
    fetchStatus(sessionId);
  };
  const fetchStatus = currentSessionId => {
    console.log('fetchStatus starting');
    console.log('currentSessionId:', currentSessionId);
    if (currentSessionId) {
      fetch("https://api.login.broker/".concat(tenantName, "/auth/status/").concat(currentSessionId)).then(response => response.text()).then(handleStatusResponse).catch(handleError);
    }
  };
  const MAX_RETRY_COUNT = 60; // Maximum retry count (2 minutes with 2-second intervals)

  let retryCount = 0; // Keep track of the number of retries
  let hasBeenPending = false;
  const handleStatusResponse = data => {
    if (data === 'completed') {
      onSessionReceived(sessionId);
    } else if (data === 'failed') {
      console.log('Login failed. Try again');
      onErrorReceived(data);
    } else if (data === 'pending') {
      hasBeenPending = true;
      retryLoginOrGiveUp();
    } else if (hasBeenPending) {
      console.log('Session expired');
      onErrorReceived(data);
    } else {
      console.log('Session not yet available');
      retryLoginOrGiveUp();
    }
  };
  const retryLoginOrGiveUp = () => {
    if (retryCount < MAX_RETRY_COUNT) {
      retryCount++;
      setTimeout(confirmLogin, 2000); // Retry after 2 seconds
    } else {
      console.log('Max retries reached while pending. Giving up.');
      onErrorReceived('Max retries reached while pending. Giving up.');
    }
  };
  const handleError = error => {
    console.error(error);
    onErrorReceived(error);
  };
  const startLoginProcess = () => {
    const newSessionId = generateRandomString(15);
    window.open("https://".concat(platform, ".login.broker/").concat(tenantName, "/auth/").concat(platform, "/session/").concat(newSessionId));

    // Wait for the window to open and to save the new session in the API  
    setTimeout(() => {
      setSessionId(newSessionId);
    }, 2000); // Adjust the delay time as needed
  };

  (0, _react.useEffect)(() => {
    if (sessionId) {
      fetchStatus(sessionId);
    }
  }, [sessionId]);
  return {
    startLoginProcess
  };
}