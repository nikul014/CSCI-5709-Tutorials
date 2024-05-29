import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello, Nikul Kukadiya
        </p>
        <a
          className="Linkedin"
          href="https://www.linkedin.com/in/nikul-kukadiya/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to Linkedin Profile
        </a>
      </header>
    </div>
  );
}

export default App;
