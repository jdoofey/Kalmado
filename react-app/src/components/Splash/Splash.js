
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Modal } from '../../context/Modal'
import LoginForm from '../auth/LoginForm'
import logo from "../../assets/logo/Kalmado-1.png"
import './Splash.css'

function Splash() {
  const [showModal, setShowModal] = useState(false)
  return (

    <div className="splash-container">
      <div>
        <h1>todo: add slider text, fix signup and demo</h1>
      </div>
      <div className="splash-middle-div">
        <img className="splash-logo" src={logo} />
        <div>

          <button className="btn-type1 log-in"
            onClick={()=> setShowModal(true)}
            >Log In
          </button>
          {showModal && (
            <Modal>
              <div>
                <div className="login-cancel-btn"
                onClick={()=> setShowModal(false)}
                >X</div>
                <LoginForm />
              </div>
            </Modal>
          )}
          <button className="btn-type1 log-out">Sign Up</button>
        </div>
        <div>
          <button className="btn-type1 demo">Demo</button>
        </div>
      </div>
      <div>
        <h1>todo: add external links</h1>
      </div>
    </div>
  )
}

export default Splash
