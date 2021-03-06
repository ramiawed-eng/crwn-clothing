import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import './header.styles.scss';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import {
  HeaderContainer,
  LogoContainer,
  OptionContainer,
  OptionLink,
} from './header.styles.jsx';
import { signOutStart } from '../../redux/user/user.actions';

const Header = ({ currentUser, hidden, signOutStart }) => (
  // without styled-components library

  // <div className='header'>
  //   <Link className='logo-container' to='/'>
  //     <Logo className='logo' />
  //   </Link>

  //   <div className='options'>
  //     <Link to='/shop' className='option'>
  //       SHOP
  //     </Link>
  //     <Link to='/shop' className='option'>
  //       CONTACT
  //     </Link>
  //     {currentUser ? (
  //       <div className='option' onClick={() => auth.signOut()}>
  //         SIGN OUT
  //       </div>
  //     ) : (
  //       <Link className='option' to='/signin'>
  //         SIGN IN
  //       </Link>
  //     )}
  //     <CartIcon />
  //   </div>
  //   {hidden ? null : <CartDropdown />}
  // </div>

  // with styled-components library

  <HeaderContainer>
    <LogoContainer to='/'>
      <Logo className='logo' />
    </LogoContainer>

    <OptionContainer>
      <OptionLink to='/shop'>SHOP</OptionLink>
      <OptionLink to='/shop'>CONTACT</OptionLink>
      {currentUser ? (
        <OptionLink as='div' onClick={signOutStart}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to='/signin'>SIGN IN</OptionLink>
      )}
      <CartIcon />
    </OptionContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
