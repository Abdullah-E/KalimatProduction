import React, {useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import MainPage from './pages/MainPage'
import DashboardPage from './pages/DashboardPage'
import { CookiesProvider} from 'react-cookie'

function App() {

  return (
    
    <CookiesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
    </CookiesProvider>
  )
}

export default App
