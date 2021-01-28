import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import './Navigation.css'


class Navigation extends Component {
    handleNavBar = () => {
        TokenService.clearAuthToken()
        window.location = '/'
    }

    renderLogoutNavBar() {
        return (
            <div className='NavBar__logged-in'>
                <li className='nav-items'>
                    <a
                        className='links'
                        onClick={this.handleNavBar}
                        href='/'>
                        Home Page
                    </a>
                </li>
            </div>
        )
    }

    renderLoginNavBar() {
        return (
            <div className='NavBar__not-logged-in nav-container'>
                <li className='nav-items'>
                    <a
                        href='/'
                        className='links'
                    >
                        Home Page
                </a>
                </li>
                <li className='nav-items'>
                    <a
                        href='/courselist'
                        className='links'
                    >
                        My Courses
                </a>
                </li>
            </div>
        )
    }

    render() {
        return (
            <div className='header-container'>
                <ul className='nav'>
                    {!TokenService.hasAuthToken()
                        ? this.renderLogoutNavBar()
                        : this.renderLoginNavBar()}
                </ul>
            </div>
        )
    }
}

export default Navigation;