import React from 'react';
import './custom-button.styles.scss';

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

export default CustomButton;
