import React, {useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import MainPage from './pages/MainPage'
import DashboardPage from './pages/DashboardPage'

import { addCredits, useUserCookies } from './api/api'
import { CookiesProvider,useCookies} from 'react-cookie'

function App() {

  const {getUserId} = useUserCookies()
  const [setCookie, cookies] = useCookies(['user'])
  const paddle_token = "test_18780c77df0655fc4d02d1b24ec"

  useEffect(() => {
    console.log("App.js useEffect")
    //print user cookies
    console.log(cookies.user)
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
        token: paddle_token,
        eventCallback: handlePaddleEvent
    })
  }, [getUserId, cookies, setCookie])
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
