import React from 'react'
import { useLocation } from 'react-router-dom'
import MainHeader from '../layout/MainHeader'
import PropertyService from '../common/PropertyService'
import Parallax from '../common/Parallax'
import PropertyCarousel from '../common/PropertyCarousel'
import About from '../layout/About'
import AdCarousel from './AdCarousel'

const Home = () => {
  const location = useLocation()
  const message = location.state && location.state.message
  const currentUser = localStorage.getItem("userId")
  return (
    <>
      <div id='home' >
          {message && <p className='text-warning px-5 '>{message}</p>}
          {currentUser && (<h6 className='text-success text-center mt-2 '> You are Logged-In as {currentUser}</h6>
          )}
        
          <MainHeader/>
          <div className="container">
          <About />
          <Parallax/>
          <AdCarousel/>
          <PropertyService/>
          <Parallax/>
          <PropertyCarousel/>

          
        </div>
      </div>
    </>
  )
}

export default Home