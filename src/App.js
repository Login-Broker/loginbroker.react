import logo from './logo.svg';
import './App.css';
import { LoginButton } from './lib';

function App() {
  const handleLogin = (cookie, url) => {
    // window.location.replace(url);
    document.cookie = cookie;
    window.location.href = url;
  }

  return (
    <div className="App">
      <LoginButton platform={'google'} handleLogin={handleLogin} />
      <LoginButton platform={'github'} handleLogin={handleLogin} />
    </div>
  );
}

export default App;
