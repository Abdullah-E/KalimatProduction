import React, {useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import MainPage from './pages/MainPage'
import DashboardPage from './pages/DashboardPage'
import PolicyPage from './pages/PolicyPage'
import { CookiesProvider} from 'react-cookie'

function App() {

  return (
    
    <CookiesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/policy" element={<PolicyPage />} />
        </Routes>
      </Router>
    </CookiesProvider>
  )
}

export default App
