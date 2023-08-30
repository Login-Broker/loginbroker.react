"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.promise.js");
var _react = _interopRequireWildcard(require("react"));
var _SessionIDHandler = require("./SessionIDHandler");
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
function prepareSessionID(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  const sessionID = name + "=" + encodeURIComponent(JSON.stringify(value)) + ";expires=" + expires.toUTCString() + ";path=/";
  (0, _SessionIDHandler.SetSessionID)(sessionID);
}
function LoginButton(_ref) {
  let {
    platform,
    handleLogin
  } = _ref;
  const [tokenId, setTokenId] = (0, _react.useState)(null);
  const confirmLogin = () => {
    // Implement the login logic here, similar to your login function
    fetch("https://api.login.broker/loginbroker/auth/status/".concat(tokenId)).then(response => response.text()) // Read response as text
    .then(data => {
      if (data === 'completed') {
        const loginUrl = "https://api.login.broker/account/login/".concat(tokenId);
        fetch(loginUrl).then(response => response.json()).then(data => {
          if (data.errorType) {
            console.log(data.errorType);
          } else {
            handleLogin(prepareSessionID("authToken", data, 1000));
          }
        });
      } else if (data === 'pending') {
        setTimeout(confirmLogin, 2000); // Check again after 2 seconds
      } else if (data === 'failed') {
        console.log('Login failed. Try again');
      } else {
        console.log('Unknown issue');
      }
    }).catch(error => {
      console.error(error);
    });
  };
  const handleButtonClick = () => {
    const newTokenId = generateRandomString(15);
    setTokenId(newTokenId);
  };
  (0, _react.useEffect)(() => {
    if (tokenId) {
      // Start the login process when tokenId is available
      window.open('https://' + platform + '.login.broker/loginbroker/auth/' + platform + '/session/' + tokenId);
      setTimeout(confirmLogin, 5000);
    }
  }, [tokenId, platform, confirmLogin]);
  return /*#__PURE__*/_react.default.createElement("button", {
    className: "login-broker-button login-broker-".concat(platform, "-button"),
    onClick: handleButtonClick
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fab fa-".concat(platform)
  }), "Login with ", platform);
}
var _default = LoginButton;
exports.default = _default;