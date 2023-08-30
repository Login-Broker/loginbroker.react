"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetSessionID = GetSessionID;
exports.SetSessionID = SetSessionID;
function GetSessionID() {
  return localStorage.getItem('login_broker_session_id');
}
function SetSessionID(sessionID) {
  localStorage.setItem('login_broker_session_id', sessionID);
}