import { useState } from 'react'
import './App.css'
import Accord from './components/Accord'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Accord />
    </>
  )
}

export default App
