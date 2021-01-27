import React from 'react'
import './Navigation.css'


function Navigation() {
    return (
        <div className='nav-container'>
            <ul className='nav'>
                <li className='nav-items'><a href={'/'} className='links'>Home Page</a></li>
                {' '}
                <li className='nav-items'><a href={'/courselist'} className='links'>My Courses</a></li>
            </ul>
        </div>
    )
}

export default Navigation;