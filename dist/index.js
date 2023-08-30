"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "GetSessionID", {
  enumerable: true,
  get: function get() {
    return _SessionIDHandler.GetSessionID;
  }
});
Object.defineProperty(exports, "LoginButton", {
  enumerable: true,
  get: function get() {
    return _LoginButton.default;
  }
});
Object.defineProperty(exports, "SetSessionID", {
  enumerable: true,
  get: function get() {
    return _SessionIDHandler.SetSessionID;
  }
});
var _LoginButton = _interopRequireDefault(require("./components/LoginButton"));
var _SessionIDHandler = require("./components/SessionIDHandler");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }