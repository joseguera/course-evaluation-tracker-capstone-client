import React from 'react'
import { Link } from 'react-router-dom'
import './Navigation.css'


function Navigation() {
    return (
        <div className='nav-container'>
            <ul className='nav'>
                <li className='nav-items'><Link to={'/'} className='links'>Home Page</Link></li>
                {' '}
                <li className='nav-items'><Link to={'/nomlist'} className='links'>My Noms</Link></li>
            </ul>
        </div>
    )
}

export default Navigation;