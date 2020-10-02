import React from 'react';
import './custom-button.styles.scss';
import { CustomButtonContainer } from './cutsom-button.styles';

// without using styled components
const CustomButton = ({
  children,
  isSignInWithGoogle,
  inverted,
  ...otherProps
}) => (
  <button
    className={`${inverted ? 'inverted' : ''} ${
      isSignInWithGoogle ? 'google-sign-in' : ''
    } custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

// with styled components
// const CustomButton = ({ children, ...props }) => (
//   <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
// );

export default CustomButton;
