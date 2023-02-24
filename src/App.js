import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import { zip } from 'ramda'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import IconSend from './components/icons/IconSend'
import IconThemeDark from './components/icons/IconThemeDark'
import useUI from './contexts/useUI'

function App() {
  const	{theme, switchTheme} = useUI();

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
    fetch(`https://ygenius-brain.yearn.network/ask?query=${
      encodeURIComponent(question.substring(0, 4000))
    }&history=${
      _answers.length === 0
        ? 'none'
        : encodeURIComponent(zip(_questions, _answers)
          .map(([q, a]) => `Anon:\n${q}\nYou:\n${a}`).join('\n\n'))
          .substring(0, 4000)
    }`)
    .then((response) => response.json() )
    .then((data) => {
      setAnswers(() => [..._answers, data])
      setIsLoading(() => false)
    })
		.catch((data) => {
      setAnswers(() => [..._answers, 'yGenius did not respond. Try regenerate response in a minute.'])
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
    <div className='App'>
      <div className='header'>
        <div>
          <a className='dark:text-white' target="_blank" href="https://yearn.finance/" rel="noreferrer">yearn.fi</a>
        </div>
        <div>
          <a className='dark:text-white dark:hover:text-gray-400' target="_blank" href="https://github.com/yearn/ygenius-brain" rel="noreferrer">source</a>
        </div>
      </div>

      <main>
        <div className='dark:text-white'>
          <img src={logo} alt='Logo' />
          <h1>yGenius</h1>
          <h2>Get to know yearn without having to talk to a dev</h2>
        <div className='scrollable'>
            {!isFirstRequest && <div>
              {questions.map((question, index) => {
                return (
                  <div className='questions-answers' key={question}>
                    <p style={{color:'#7E7E7E'}}><b>Anon</b></p>
                    <p>{question}</p>
                    <p style={{color:'#0657F9', marginTop: 30}}><b>yGenius</b></p>
                    {answers[index] ? <div>
                      <pre style={{marginBottom: 30}} >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{answers[index]}</ReactMarkdown>
                      </pre>
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
          {theme === 'dark' ? <div className='dark-fade'></div> : <div className='white-fade'></div> }
        </div>
      </main>
      
      <footer>
        <div className='buttons'>
          <button className='dark:text-white dark:bg-blue-700'onClick={() => {
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
          </button>
          <button className='ml-5 dark:text-white dark:bg-blue-700' onClick={() => {
            if (isLoading || answers.length === 0 ) { return }
            setAnswers([])
            setQuestions([])
            setIsFirstRequest(() => true)
          }}>
            Clear All
          </button>
        </div>
        <div className='input-wrapper'>
          <input className={theme === 'dark'?'shadow-dark' : 'shadow-light'} type="text" placeholder="Ask here" value={input} autoFocus
            onFocus={(e) => e.target.placeholder = ""}
            onBlur={(e) => e.target.placeholder = "Ask here"}
            onChange={e => { setInput(() => e.target.value.substring(0, 4000))}}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                generateResponse(input)
              }
            }}
          />
          <IconSend className='send' onClick={() => generateResponse(input)} />
        </div>
        <div className='footer-details'> 
        <div>{''}</div>
          <span className='dark:text-white'>
            GPT Index powered by yearn devdocs, articles, proposals, onchain data, and support channel history.
          </span>
           <IconThemeDark 
           className={'iconDark dark:text-white'}
           onClick={switchTheme}/>
        </div>
      </footer>
    </div>
  )
}

export default App
