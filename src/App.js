import { useState } from 'react'
import logo from './logo.svg'
import send from './send.svg'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [question, setQuestion] = useState('')
  return (
    <div className="App">
      <header>
        <div>
          <a target="_blank" href="https://yearn.finance/">yearn.fi</a>
        </div>
        <div>
          <a target="_blank" href="https://docs.yearn.finance">docs.yearn</a>
        </div>
      </header>
      
      <main>
        <div>
          <img src={logo} />
          <h1>yGenius</h1>
          <h2>Support Assistant</h2>
          <div>
            {question && <div>
              <p style={{color:'grey'}}><b>Anon</b></p>
              <p>{question}</p>
            </div>}
            {result && <div>
              <p style={{color:'blue'}}><b>yGenius</b></p>
              <p>{result}</p>
            </div>}
          </div>
        </div>
      </main>
      
      <footer>
        <a>
          Regenerate Response
        </a>
        <div>
          <img src={send} alt="" onClick={() => {
            setQuestion(input)
            fetch(`https://a1b2-2804-431-c7f3-9298-b9b2-78a-92d3-19f6.sa.ngrok.io/ask?query=${input}`)
            .then((response) => response.text())
            .then((data) => {
              setResult(data.replace(/\\n/g,'\n').replace(/^"|"$/g, '').replace(/"$/gm, ''))
            });
            setInput('')
          }} />
          <input type="text" placeholder="Ask here" value={input} onChange={e => { setInput(e.target.value) }} />
        </div>
        <span>
          GPT Index powered by yearn devdocs, articles, proposals, onchain data, and support channel history.
        </span>
      </footer>
    </div>
  )
}

export default App
