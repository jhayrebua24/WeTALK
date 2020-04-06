import React, { Suspense } from 'react';
import Wrapper from '../components/Wrapper';
import { Flexbox } from '../components/StyledComponents';
import Loader from '../components/Loader/Loader';

const RegisterForm = React.lazy(() => import('../components/Forms/RegisterForm'));
const Register = () => (
  <Wrapper>
    <Flexbox>
      <Suspense fallback={<Loader />}>
        <RegisterForm />
      </Suspense>
    </Flexbox>
  </Wrapper>
)


export default Register
