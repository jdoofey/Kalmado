
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
    <div>
      <div className="splash-navbar-div">
        <div>
          <img className="nav-logo" src={navLogo} />
        </div>
        <div>

          <button>LOG IN</button>
          <button>DEMO</button>
          <button>GET STARTED</button>
        </div>
      </div>
      <div className="splash-container">

        <div className="splash-middle-div">
          <img className="splash-logo" src={logo} />
          <div>

            <button className="btn-type1 log-in"
              onClick={() => setShowModal(true)}
            >Log In
            </button>

            {showModal && (
              <Modal>
                <div>
                  <div className="login-cancel-btn"
                    onClick={() => setShowModal(false)}
                  >X</div>
                  <LoginForm />
                </div>
              </Modal>
            )}
            <button className="btn-type1 log-out" onClick={()=> history.push("/sign-up")}>Sign Up</button>
          </div>
          {/* <div>
          <button className="btn-type1 demo"
          onClick={demoLogin}
          >Demo</button>
        </div> */}
        </div>
      </div>
    </div>
  )
}

export default Splash
