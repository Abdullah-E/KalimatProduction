import Navigation from '../components/Navigation';
import About from '../components/About';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
// import Footer from '../components/Footer';
import Footer from '../components/PolicyPage/Footer';

import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { addCredits, useUserCookies } from '../api/api';

function App() {
  const {getUserId} = useUserCookies()
  const [ cookies,setCookie] = useCookies(['user'])
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
        token: process.env.REACT_APP_PADDLE_TOKEN,
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
