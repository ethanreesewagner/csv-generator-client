import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CsvGenerator from './components/CsvGenerator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CsvGenerator/>
    </>
  )
}

export default App
