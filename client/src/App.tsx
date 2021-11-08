import './App.css';
import { Header } from './component/Header';




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
    <div>
      <Header/>
    </div>
  );
}

export default App;