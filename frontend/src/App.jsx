import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import { Box } from 'lucide-react'
import Login from './components/Login'
import SignupCard from './components/Signup'
import { useRecoilValue } from 'recoil'
import userAtom from './atoms/userAtom'
import { Route, Routes } from 'react-router-dom'
import AuthPage from './components/AuthScreen'
import HomePage from './components/HomePage'

function App() {
  const user = useRecoilValue(userAtom);

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth' element={<AuthPage />} />
      </Routes>
    </div>
  )
}

export default App
