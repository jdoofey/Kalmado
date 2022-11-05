import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'
import logo from "../../assets/logo/nav-logo.png"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data)
        console.log(data)
      }
    } if (password !== repeatPassword) setErrors(["password: Passwords must match"])

  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div className="signup-master-container">
      <div className="sign-up-form-container">
        <img className="signup-logo" alt="signup-logo" src={logo} />
        <form className="signup-form" onSubmit={onSignUp}>
          <div className="errors-div-container">
            {errors.map((error, ind) => (
              <div className="error-message" key={ind}>*{error.split(":")[1]}</div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              className="signup-label"
            >First Name</label>
            <input
              type='text'
              name='firstName'
              className="signup-input"
              onChange={updateFirstName}
              value={firstName}
              required
            ></input>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              className="signup-label"
            >Last Name</label>
            <input
              type='text'
              name='lastName'
              className="signup-input"
              onChange={updateLastName}
              value={lastName}
              required
            ></input>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              className="signup-label"
            >Email</label>
            <input
              type='email'
              name='email'
              className="signup-input"
              onChange={updateEmail}
              value={email}
              required
            ></input>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }} >
            <label
              className="signup-label"
            >Password</label>
            <input
              type='password'
              name='password'
              className="signup-input"
              onChange={updatePassword}
              value={password}
              required
            ></input>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              className="signup-label"
            >Repeat Password</label>
            <input
              type='password'
              name='repeat_password'
              className="signup-input"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button className="signup-btn" type='submit'>Sign Up</button>
          <div
            className="signup-return"
            onClick={() => history.push('/')}>{"<-"} Back to splash</div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
