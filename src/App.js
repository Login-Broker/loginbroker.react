import logo from './logo.svg';
import './App.css';
import { LoginButton } from './lib';

function App() {

  const handleSessionReceived = (sessionId) => {
		console.log('Received sessionId', sessionId);
		// perform further action
	}

  const handleErrorReceived = (error) => {
    console.log('Error happened', error);
  }
  
  return (
    <div className="App">
      <LoginButton platform={'google'} onSessionReceived={handleSessionReceived} onErrorReceived={handleErrorReceived} />
      <LoginButton platform={'github'} onSessionReceived={handleSessionReceived} onErrorReceived={handleErrorReceived} />
    </div>
  );
}

export default App;
