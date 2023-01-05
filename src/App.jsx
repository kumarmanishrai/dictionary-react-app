import { useState } from 'react'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('')
  const [definition, setDefinition] = useState('')
  const [example, setExample] = useState('')

  const handleChange = (event) => {
    setInputText(event.target.value)
  }
  
  const getMeaning = () => {
    setExample('')
    setDefinition('')
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputText}`)
      .then(res => res.json())
      .then((data) => 
        {
          console.log(data)
          const {definition} = data[0].meanings[0].definitions[0] 
          setDefinition(""+ definition)
          const {example} = data[0].meanings[0].definitions[0]
          setExample("" + example)
          console.log(definition)
          console.log(example)
        }
      )
      .catch(err => {
        console.log(err.message)
        setDefinition("can't find")
        setExample("can't find")
      })
  }

  return (
    <div className="App">
      <h1>Dictionary App</h1>
      {/* we can also use Ref hook here */}
      <input onChange={handleChange} type="text"  placeholder='Enter word . . . . .' />
      <button onClick={getMeaning}>Define</button>
      <div>
        <span>
          <p><b>definition: </b>{definition}</p>
          <p><b>example: </b>{example}</p>
        </span>
        
      </div>
    </div>
  )
}

export default App
