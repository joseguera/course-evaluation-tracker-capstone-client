import React, { Component } from 'react'
import { Hyph } from '../Utils/Utils'
import TokenService from '../../services/token-service'
import './Header.css'

export default class Header extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    window.location = '/'
  }

  renderLogoutLink() {
    return (
      <div className='Header__logged-in'>
        <a
          className='logout'
          onClick={this.handleLogoutClick}
          href='/'>
          Logout
        </a>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='Header__not-logged-in header-links'>
        <a
          className='reg-links'
          href='/register'>
          Register
        </a>
        <Hyph />
        <a
          className='reg-links'
          href='/login'>
          Log in
        </a>
      </div>
    )
  }

  render() {
    return (
      <div className='header-container'>
      <nav className='Header'>
        <h1>
          <a href='/' className='site-title'>
            <span className='first-N'>C</span>ourse<span className='last-N'>G</span>rader
          </a>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </nav>
      </div>
    )
  }
}