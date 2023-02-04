import logo from './logo.svg';
import send from './send.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <div>
          <span>yearn.fi</span>
        </div>
        <div>
          <span>docs.yearn</span>
        </div>
      </header>
      
      <main>
        <div>
          <img src={logo} />
          <h1>yGenius</h1>
          <h2>Support Assistant</h2>
          <div>
            <p style={{color:'grey'}}><b>Anon</b></p>
            <p>When veYFI?</p>
            <br />
            <p style={{color:'blue'}}><b>yGenius</b></p>
            <p>lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum </p>
          </div>
        </div>
      </main>
      
      <footer>
        <a>
          Regenerate Response
        </a>
        <div>
          <img src={send} />
          <input type="text" placeholder="Ask here" />
        </div>
        <span>
          GPT Index powered by yearn devdocs, articles, proposals, onchain data, and support channel history.
        </span>
      </footer>
    </div>
  );
}

export default App;
