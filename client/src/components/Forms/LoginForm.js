import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import {
  FormSection,
  FormHeader,
  Form,
  FormInput,
  FormRow,
  StyledButton,
  CardErrors
} from '../StyledComponents';
import Loader from '../Loader/Loader';
import FormErrorMessage from './FormErrorMessage';
import { storeToken, isAutenticated } from '../../auth/checkauth';

const validation = Yup.object().shape({
  username: Yup.string()
    .max(12)
    .min(3)
    .matches(/^[a-zA-Z0-9_]*$/, 'Invalid format')
    .required()
    .label('Username'),
  password: Yup.string()
    .min(6)
    .max(12)
    .required()
    .label('Password'),
});

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const onSubmitRegistration = (values, setSubmitting) => {
    setLoading(true);
    axios.post(`/api/user/login`, values, {
      headers: { "Content-type": "application/json" }
    })
      .then((res) => {
        const { token } = res.data;
        storeToken(token);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 422)
            setErrors(err.response.data);
        }
        setLoading(false);
        setSubmitting(false);
      });
  }

  if (isAutenticated())
    return <Redirect to="/messenger" />

  return (
    <FormSection>
      <FormHeader>Login to WeTALK</FormHeader>
      <Formik
        validationSchema={validation}
        initialValues={{
          username: '',
          email: '',
          password: '',
          passwordConfirm: '',
        }}
        onSubmit={(values, { setSubmitting }) => onSubmitRegistration(values, setSubmitting, setLoading)}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          isSubmitting,
        }) => (
            <Form onSubmit={handleSubmit}>
              {errors.map((error, key) => (
                <CardErrors key={key}>{error.msg}</CardErrors>
              ))}
              <FormRow>
                <label className="form-label" htmlFor="username">Username:</label>
                <FormInput
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  autoComplete="off"
                  autoFocus
                />
                <FormErrorMessage name="username" />
              </FormRow>
              <FormRow>
                <label className="form-label" htmlFor="password">password:</label>
                <FormInput
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password"
                  autoComplete="off"
                />
                <FormErrorMessage name="password" />
              </FormRow>
              <FormRow>
                <StyledButton type="submit" disabled={isSubmitting} block>LOGIN</StyledButton>
              </FormRow>
              <FormRow style={{
                textAlign: 'center',
              }}>
                <Link to="/register">No account? Click to sign up</Link>
              </FormRow>
            </Form>
          )}
      </Formik>
      {loading && <Loader msg="Submitting" />}
    </FormSection>
  )
}

export default LoginForm
