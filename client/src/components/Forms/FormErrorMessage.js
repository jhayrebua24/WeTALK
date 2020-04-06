import React from 'react';
import { connect } from 'formik';
import { ColoredText } from '../StyledComponents';

const FormErrorMessage = (props) => {
  const { name, formik: {
    errors,
    touched
  } } = props;
  return (
    <ColoredText type="danger">
      {errors[name] && touched[name] && errors[name]}
    </ColoredText>
  )
}

export default connect(FormErrorMessage)
