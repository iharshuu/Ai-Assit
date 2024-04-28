import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChatApp from './components/molecules/Background/Background'
import Navbar from './components/organisms/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
          <Navbar/>
  <ChatApp/>
    </>
  )
}

export default App
