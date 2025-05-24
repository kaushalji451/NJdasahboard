import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AddCandidate from './pages/AddCandidate'
import Home from './pages/Home'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/add' element={<AddCandidate />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
