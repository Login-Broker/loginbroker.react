import logo from './logo.svg';
import './App.css';
import { SessionButton } from './lib';

function App() {

  const handleSessionReceived = (sessionId) => {
		console.log('Received sessionId', sessionId);
		// perform further action
    // window.location.href="https://login.broker/"
	}

  const handleErrorReceived = (error) => {
    console.log('Error happened', error);
  }
  
  return (
    <div className="App">
      <SessionButton platform={'google'} onSessionReceived={handleSessionReceived} onErrorReceived={handleErrorReceived} />
      <SessionButton platform={'github'} onSessionReceived={handleSessionReceived} onErrorReceived={handleErrorReceived} />
    </div>
  );
}

export default App;
