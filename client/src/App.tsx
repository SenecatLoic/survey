import logo from './logo.svg';
import './App.css';

function App() {
  const client = new WebSocket('ws://localhost:3000');
  client.addEventListener("open", () => {
    // Causes the server to print "Hello"
    client.send('Hello');
  })
  client.addEventListener("message", msg => {
    const data = JSON.parse(msg.data);
    console.log(data);
  })


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
