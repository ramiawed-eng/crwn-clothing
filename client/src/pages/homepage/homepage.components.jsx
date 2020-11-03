import React from 'react';
import Directory from '../../components/directory/directory.component';

import './homepage.styles.scss';
import { HomePageContainer } from './homepage.styles';

const HomePage = () => (
  // without styled-component
  // <div className='homepage'>
  //   <Directory />
  // </div>

  // same as before but with styled-component
  <HomePageContainer>
    <Directory />
  </HomePageContainer>
);

export default HomePage;
