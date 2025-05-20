import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AddCandidate from './pages/AddCandidate'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/add' element={<AddCandidate />} />
      </Routes>
    </div>
  )
}

export default App
