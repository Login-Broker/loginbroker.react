"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.promise.js");
var _react = _interopRequireWildcard(require("react"));
require("./styles.css");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
function LoginBrokerButton(_ref) {
  let {
    tenantName,
    platform,
    onSessionReceived,
    onErrorReceived
  } = _ref;
  const [sessionId, setSessionId] = (0, _react.useState)(null);
  const confirmLogin = () => {
    fetchStatus();
  };
  const fetchStatus = () => {
    fetch("https://api.login.broker/".concat(tenantName, "/auth/status/").concat(sessionId)).then(response => response.text()).then(handleStatusResponse).catch(handleError);
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
    const loginUrl = "https://api.login.broker/account/login/".concat(sessionId);
    fetch(loginUrl).then(response => response.json()).then(handleLoginResponse).catch(handleError);
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
  const handleButtonClick = () => {
    setSessionId(generateRandomString(15));
  };
  (0, _react.useEffect)(() => {
    if (sessionId) {
      // Start the login process when sessionId is available
      window.open('https://' + platform + '.login.broker/' + tenantName + '/auth/' + platform + '/session/' + sessionId);
      setTimeout(confirmLogin, 2000);
    }
  }, [sessionId, platform, tenantName, confirmLogin]);
  return /*#__PURE__*/_react.default.createElement("button", {
    className: "login-broker-button login-broker-".concat(platform, "-button"),
    onClick: handleButtonClick
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fab fa-".concat(platform)
  }), "Login with ", platform);
}
var _default = LoginBrokerButton;
exports.default = _default;