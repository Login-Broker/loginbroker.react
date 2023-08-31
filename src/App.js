import logo from './logo.svg';
import './App.css';
import { LoginBrokerButton } from './lib';
import useLoginBroker from './lib/components/useLoginBroker';

function App() {

  const handleSessionReceived = (sessionId) => {
		console.log('Received sessionId', sessionId);
    // Verify the sessionId on your server-side or API and get the logged in user email
	}

  const handleErrorReceived = (error) => {
    console.log('Error happened', error);
  }
  
  const { startLoginProcess } = useLoginBroker("loginbroker", "google", handleSessionReceived, handleErrorReceived);
  
  return (
    <div className="App">
      <LoginBrokerButton tenantName="loginbroker" platform={'google'} onSessionReceived={handleSessionReceived} onErrorReceived={handleErrorReceived} />
      <LoginBrokerButton tenantName="loginbroker" platform={'github'} onSessionReceived={handleSessionReceived} onErrorReceived={handleErrorReceived} />

      {/* Example using the useLoginBroker hook */}
      <button onClick={startLoginProcess}>Start Login Process</button>
    </div>
  );
}

export default App;