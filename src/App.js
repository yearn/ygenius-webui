import { useState, useEffect } from 'react'
import logo from './logo.svg'
import send from './send.svg'
import './App.css'
import { zip } from 'ramda'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


function App() {
  const [input, setInput] = useState('')
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [isFirstRequest, setIsFirstRequest] = useState(true)

  const generateResponse = (question, _questions, _answers) => {
    if (isLoading) { return }
    if (_questions) {
      setQuestions(_questions)
    }
    if (_answers) {
      setAnswers(_answers)
    }
    if (_questions === undefined) { _questions = questions }
    if (_answers === undefined) { _answers = answers }
    setIsFirstRequest(() => false)
    setIsLoading(() => true)
    setQuestions(() => [..._questions, question])
    fetch(`https://fb1a-2804-431-c7f3-9713-79d5-397b-cf1d-c117.sa.ngrok.io/ask?query=${
      encodeURIComponent(question.substring(0, 4000))
    }&history=${
      encodeURIComponent(zip(_questions, _answers)
        .map(([q, a]) => `Question: ${q}\nAnswer:${a}`).join('\n\n'))
        .substring(0, 4000)
    }`)
    .then((response) => response.text() )
    .then((data) => {
      setAnswers(() => [..._answers, data.substring(1, data.length - 2).replace(/\\n/g, '\n').replaceAll("\\u00c0", "À").replaceAll("\\u00c1", "Á").replaceAll("\\u00c2", "Â").replaceAll("\\u00c3", "Ã").replaceAll("\\u00c4", "Ä").replaceAll("\\u00c5", "Å").replaceAll("\\u00c6", "Æ").replaceAll("\\u00c7", "Ç").replaceAll("\\u00c8", "È").replaceAll("\\u00c9", "É").replaceAll("\\u00ca", "Ê").replaceAll("\\u00cb", "Ë").replaceAll("\\u00cc", "Ì").replaceAll("\\u00cd", "Í").replaceAll("\\u00ce", "Î").replaceAll("\\u00cf", "Ï").replaceAll("\\u00d0", "Ð").replaceAll("\\u00d1", "Ñ").replaceAll("\\u00d2", "Ò").replaceAll("\\u00d3", "Ó").replaceAll("\\u00d4", "Ô").replaceAll("\\u00d5", "Õ").replaceAll("\\u00d6", "Ö").replaceAll("\\u00d8", "Ø").replaceAll("\\u00d9", "Ù").replaceAll("\\u00da", "Ú").replaceAll("\\u00db", "Û").replaceAll("\\u00dc", "Ü").replaceAll("\\u00dd", "Ý").replaceAll("\\u00df", "ß").replaceAll("\\u00e0", "à").replaceAll("\\u00e1", "á").replaceAll("\\u00e2", "â").replaceAll("\\u00e3", "ã").replaceAll("\\u00e4", "ä").replaceAll("\\u00e5", "å").replaceAll("\\u00e6", "æ").replaceAll("\\u00e7", "ç").replaceAll("\\u00e8", "è").replaceAll("\\u00e9", "é").replaceAll("\\u00ea", "ê").replaceAll("\\u00eb", "ë").replaceAll("\\u00ec", "ì").replaceAll("\\u00ed", "í").replaceAll("\\u00ee", "î").replaceAll("\\u00ef", "ï").replaceAll("\\u00f0", "ð").replaceAll("\\u00f1", "ñ").replaceAll("\\u00f2", "ò").replaceAll("\\u00f3", "ó").replaceAll("\\u00f4", "ô").replaceAll("\\u00f5", "õ").replaceAll("\\u00f6", "ö").replaceAll("\\u00f8", "ø").replaceAll("\\u00f9", "ù").replaceAll("\\u00fa", "ú").replaceAll("\\u00fb", "û").replaceAll("\\u00fc", "ü").replaceAll("\\u00fd", "ý").replaceAll("\\u00ff", "ÿ").replaceAll("\\u2019","'")])
      setIsLoading(() => false)
    });
    setInput(() => '')
  }

  const scrollToBottom = () => {
    const div = document.querySelector(".scrollable");
    div.scrollTop = div.scrollHeight - div.clientHeight;
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [questions, answers]);

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
          <h2>Get to know yearn without having to talk to a dev</h2>
          <div className='scrollable'>
            {!isFirstRequest && <div>
              {questions.map((question, index) => {
                return (
                  <div class="questionsAnswers" key={question}>
                    <p style={{color:'#7E7E7E'}}><b>Anon</b></p>
                    <p>{question}</p>
                    <p style={{color:'#0657F9', marginTop: 30}}><b>yGenius</b></p>
                    {answers[index] ? <div>
                      <p style={{marginBottom: 30}} >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{answers[index]}</ReactMarkdown>
                      </p>
                    </div> : <div >
                      <p className='loading-dots'><span>.</span><span>.</span><span>.</span></p>
                    </div>}
                  </div>
                )
              })}
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>}
          </div>
          <div className='white-fade'></div>
        </div>
      </main>
      
      <footer>
        <div className="buttons">
          <a onClick={() => {
            if (isLoading || answers.length === 0 ) { return }
            const lastQuestion = questions[questions.length - 1]
            let _questions
            let _answers

            if (questions.length === 1) {
              _questions = []
              _answers = []
            } else {
              _questions = questions.slice(0, -1)
              _answers = answers.slice(0, -1)
            }

            generateResponse(lastQuestion, _questions, _answers)

          }}>
            Regenerate Response
          </a>
          <a style={{marginLeft: 20}} onClick={() => {
            if (isLoading || answers.length === 0 ) { return }
            setAnswers([])
            setQuestions([])
            setIsFirstRequest(() => true)
          }}>
            Clear All
          </a>
        </div>
        <div>
          <img src={send} alt="" onClick={() => generateResponse(input)} />
          <input type="text" placeholder="Ask here" value={input} autoFocus
            onFocus={(e) => e.target.placeholder = ""}
            onBlur={(e) => e.target.placeholder = "Ask here"}
            onChange={e => { setInput(() => e.target.value.substring(0, 4000))}}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                generateResponse(input)
              }
            }}
          />
        </div>
        <span>
          GPT Index powered by yearn devdocs, articles, proposals, onchain data, and support channel history.
        </span>
      </footer>
    </div>
  )
}

export default App
