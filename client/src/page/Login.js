import React from 'react';
import { Redirect } from 'react-router-dom';
import Wrapper from '../components/Wrapper';
import { Flexbox } from '../components/StyledComponents';
import LoginForm from '../components/Forms/LoginForm';

const Login = () => {
  return (
    <Wrapper>
      <Flexbox>
        <LoginForm />
      </Flexbox>
    </Wrapper>
  )
}

export default Login
