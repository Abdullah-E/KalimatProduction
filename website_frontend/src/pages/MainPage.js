import Navigation from '../components/Navigation';
import About from '../components/About';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { addCredits, useUserCookies } from '../api/api';

function App() {
  const {getUserId} = useUserCookies()
  const [ cookies,setCookie] = useCookies(['user'])
  const paddle_token = "test_18780c77df0655fc4d02d1b24ec"
  const g_id_temp = getUserId()
  console.log("g_id_temp:", g_id_temp)

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
            console.log("addCredits response:", response)
  
          }).catch(error => {
              console.error("Error in addCredits:", error)
              console.log('setCookie function:', setCookie);
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
  }, [getUserId, cookies])
  return (
    <div>
      <Navigation></Navigation>
      <About></About>
      <Features></Features>
      <Pricing></Pricing>
      <Footer></Footer>
    </div>
  );
}

export default App;
