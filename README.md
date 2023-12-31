# react-login-broker-library

Use Login Broker (https://login.broker) to login to your app or website with facebook, google, linkedin, microsoft, apple or github. Sign up for free and get 100,000 monthly active users. No credit card required.

Please note that after the user logs in, this will produce a 'sessionId'. This must be verified on your server-side to complete the authentication.

Get a free API key here and also see the details about how to call the api to verify:
https://login.broker/account/

## Installation

```
npm install react-login-broker-library
```

## Usage with LoginBrokerButton

This is the quickest way to make it work. It will show a button to login and includes an icon if you have Font Awesome Free version 5 available.

```
  const handleSessionReceived = (sessionId) => {
    console.log('Received sessionId', sessionId);
    // Verify the sessionId on your server-side or API and get the logged in user email
  }

  const handleErrorReceived = (error) => {
    console.log('Error happened', error);
  }
  
  return (
    <div className="App">
      <LoginBrokerButton tenantName="loginbroker" platform={'google'} onSessionReceived={handleSessionReceived} onErrorReceived={handleErrorReceived} />
      <LoginBrokerButton tenantName="loginbroker" platform={'github'} onSessionReceived={handleSessionReceived} onErrorReceived={handleErrorReceived} />
    </div>
  );
```
## Usage with useLoginBroker

Easy to use if you want to control how the login buttons look.

```
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
      {/* Example using the useLoginBroker hook */}
      <button onClick={startLoginProcess}>Start Login Process</button>
    </div>
  );
```