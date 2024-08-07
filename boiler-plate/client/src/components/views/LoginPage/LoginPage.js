import React, { useState } from 'react'
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import Auth from '../../../hoc/auth';

function LoginPage(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
      .then(response => {
        if(response.payload.loginSuccess) {
          navigate('/');
        } else {
          alert('Error')
        }
      })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>

      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
        <label>Email</label>
        <Input type='email' value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <Input type='password' value={Password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">
          Login
        </button>
      </form>

    </div>
  )
}

export default Auth(LoginPage, false);
