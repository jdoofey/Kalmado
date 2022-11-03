import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import logo from "../../assets/logo/nav-logo.png"

import './LoginForm.css'
const LoginForm = () => {
  const history = useHistory()
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    else {
      history.push("/home")
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  const demoLogin = async e => {
    e.preventDefault()
    await dispatch(login('demo@aa.io', 'password'))
    history.push('/home')
  }
  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div className="login-master-container">
      <div className="login-form-container">
      <img className="signup-logo" src={logo} />
        <form onSubmit={onLogin}>
          <div className="login-errors-div-container">
            {errors.map((error, ind) => (
              <div className="error-message" key={ind}>*{error.split(":")[1]}</div>
            ))}
          </div>
          <div className='email-div'>
            <div>
              <label className="login-label" htmlFor='email'>Email</label>
            </div>
            <input
              name='email'
              type='text'
              className='login-input'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
            <div>&nbsp;</div>
          </div>
          <div>
            <div>
              <label className="login-label" htmlFor='password'>Password</label>
            </div>
            <input
              name='password'
              type='password'
              className='login-input'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <div>&nbsp;</div>
          </div>
          <br></br>
          <div className="login-btn-div">
            <button className="login-btn" type='submit'>Login</button>
            <button className="login-btn"
              onClick={demoLogin}
            >Demo</button>
            <div className="signup-return" onClick={()=> history.push('/')}>Back to splash</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
