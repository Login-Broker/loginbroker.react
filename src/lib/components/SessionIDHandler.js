export function GetSessionID() {
    return localStorage.getItem('login_broker_session_id');
}

export function SetSessionID(sessionID) {
    localStorage.setItem('login_broker_session_id', sessionID);
}