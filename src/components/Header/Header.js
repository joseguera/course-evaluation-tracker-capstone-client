import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='Header__not-logged-in'>
        <Link
          className='reg-links'
          to='/register'>
          Register
        </Link>
        <Hyph />
        <Link
          className='reg-links'
          to='/login'>
          Log in
        </Link>
      </div>
    )
  }

  render() {
    return (
      <div className='header-container'>
      <nav className='Header'>
        <h1>
          <Link to='/' className='site-title'>
            <span className='first-N'>C</span>ourse<span className='last-N'>G</span>rader
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </nav>
      </div>
    )
  }
}