import logo from './logo.svg';
import './App.css';
import { LoginButton, GetSessionID } from './lib';
import { useEffect, useState } from 'react';

function App() {
  const [sessionID, setSessionID] = useState(GetSessionID());

  useEffect(() => {
    if (sessionID && sessionID !== '') {
      debugger
      document.cookie = sessionID;
      window.location.href = "https://login.broker/account";
    }
  }, [sessionID]);
  
  return (
    <div className="App">
      <LoginButton platform={'google'} handleLogin={setSessionID} />
      <LoginButton platform={'github'} handleLogin={setSessionID} />
    </div>
  );
}

export default App;
