# react-login-broker-library

Use Login Broker (https://login.broker) to login to your app or website with facebook, google, linkedin, microsoft, apple or github. Sign up for free and get 100,000 monthly active users. No credit card required.

## Installation

```
npm install react-login-broker-library
```

## Usage

```
  const handleSessionReceived = (sessionId) => {
    console.log('Received sessionId', sessionId);
    // Verify the sessionId on your server-side or API and get the logged in user email
  }

  const handleErrorReceived = (error) => {
    console.log('Error happened', error);
  }

  <SessionButton platform={your_favorite_platform} onSessionReceived={your_received_session_handler} onErrorReceived={your_received_error_handler} />
```