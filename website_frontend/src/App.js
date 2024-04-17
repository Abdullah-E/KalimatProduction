import React, {useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import MainPage from './pages/MainPage'
import DashboardPage from './pages/DashboardPage'

import { addCredits, useUserCookies } from './api/api'
import { useCookies } from 'react-cookie'

function App() {

  const {getUserId} = useUserCookies()
  const [setCookie] = useCookies(['user'])


  useEffect(() => {
    const Paddle = window.Paddle
    const handlePaddleEvent = (data) => {
      if (data.name === "checkout.completed") {
        // console.log(data);
        const items_arr = data.data.items
        let total_credits = 0
        items_arr.forEach(item => {
          const credits = parseInt(item.product.name.split(' ')[0])
          total_credits += credits * item.quantity
        })
        
        const g_id = getUserId()
        if(g_id){

          addCredits(g_id, total_credits).then(response => {

              setCookie('user', response.profile, { path: '/' })
  
          }).catch(error => {
              console.error("Error in addCredits:", error)
          })
        }else{
          console.error("g_id is not set.")
        }
      }
    }
    Paddle.Initialize({
        token: REACT_APP_PADDLE_TOKEN,
        eventCallback: handlePaddleEvent
    })
  }, [getUserId])
  return (

    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>

  )
}

export default App
