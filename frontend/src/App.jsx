import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AddCandidate from './pages/AddCandidate'
import EditCandidate from './pages/EditCandidate'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/add' element={<AddCandidate />} />
        <Route path='/edit/:id' element={<EditCandidate />} />
      </Routes>
    </div>
  )
}

export default App
