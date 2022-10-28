import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
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

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='email-div'>
        <div>
          <label htmlFor='email'>Email</label>
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
          <label htmlFor='password'>Password</label>
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
      </div>
    </form>
  );
};

export default LoginForm;
