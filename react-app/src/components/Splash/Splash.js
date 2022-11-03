
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Modal } from '../../context/Modal'
import LoginForm from '../auth/LoginForm'
import logo from "../../assets/logo/Kalmado-1.png"
import { useHistory } from 'react-router-dom'
import { login } from '../../store/session'
import navLogo from "../../assets/logo/nav-logo.png"
import splash1 from "../../assets/logo/splash-collab.jpg"
import tick from "../../assets/logo/tick.png"
import './Splash.css'


function Splash() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [showModal, setShowModal] = useState(false)

  const demoLogin = e => {
    e.preventDefault()
    dispatch(login('demo@aa.io', 'password'))
    history.push('/home')
  }
  return (
    <div >
      <div>

      <div className="splash-navbar-div">
        <div>
          <img className="nav-logo" src={navLogo} />
        </div>
        <div style={{display:"flex"}}>

          <button className="nav-login-btn nav-btn"onClick={()=> history.push("/login")}>Log In</button>
          <button className="nav-demo-btn nav-btn"onClick={demoLogin}>Demo</button>
          <button className="nav-signup-btn nav-btn"onClick={()=> history.push("/sign-up")}>Get Started</button>
        </div>
      </div>
      </div>
      <div className="splash-container">
        <div className="first-text-splash-div">
          <div className="first-text-header">Kalmado helps teams make progress.</div>
          <div className="first-text-description">Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique—accomplish it all with Kalmado.</div>
          <br/><br/><br/><br/>
          <button className="try-free-btn">Try for free</button>
        </div>
        <div>
          <img className="splash-img-2"src="https://i.imgur.com/hf0NUPZ.jpg"/>
          <div className="slider1"><img className="tick-icon" src={tick}/>Fix database relationships</div>
          <div className="slider3"><img className="tick-icon" src={tick}/>Adjust redux store shape</div>
          <img className="splash-img"src={splash1}/>
          <div className="slider2"><img className="tick-icon" src={tick}/>Secure the Google Maps Api Key</div>
        </div>

      </div>
    </div>
  )
}

export default Splash
