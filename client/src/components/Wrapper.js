import React from 'react';
import PropTypes from 'prop-types';
import {
  Container
} from './StyledComponents';

const Wrapper = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  )
}
Wrapper.propTypes = {
  children: PropTypes.node,
}
export default Wrapper
