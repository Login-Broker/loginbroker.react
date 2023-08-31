"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _useLoginBroker = _interopRequireDefault(require("./useLoginBroker"));
require("./styles.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function LoginBrokerButton(_ref) {
  let {
    tenantName,
    platform,
    onSessionReceived,
    onErrorReceived
  } = _ref;
  const {
    startLoginProcess
  } = (0, _useLoginBroker.default)(tenantName, platform, onSessionReceived, onErrorReceived);
  const handleSessionReceived = sessionId => {
    onSessionReceived(sessionId);
  };
  const handleErrorReceived = error => {
    onErrorReceived(error);
  };
  return /*#__PURE__*/_react.default.createElement("button", {
    className: "login-broker-button login-broker-".concat(platform, "-button"),
    onClick: startLoginProcess
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fab fa-".concat(platform)
  }), "Login with ", platform);
}
var _default = LoginBrokerButton;
exports.default = _default;