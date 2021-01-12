import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Home.css'

class Home extends Component  {
    
    render() {
        return (
            <div className='home-body'>
                <div className='courses-1'>
                    <h3 className='home-heading'>What is Courses?</h3>
                    <p className='home-text'>Courses is a place to save vegan recipes and substitutions (or, courses) by collecting all of those links, brands and countless other things that are often difficult to keep track of.</p>
                    <p  className='home-text'>
                        <Link className='reg-links' to='/login'>Log in</Link> or <Link className='reg-links' to='/register'>Register</Link> to get started.</p>
                    <p>To view a demo:<br/>
                        username: samples-account<br/>
                        password: Password123!
                    </p>
                </div>
                <div className='courses-2'>
                    <h3 className='home-heading'>No Courses? No worries</h3>
                    <p  className='home-text'>Search the web and save the ingredients and recipes that you find here.</p>
                </div>
                <div className='courses-3'>
                    <h3 className='home-heading'>A Courses for all</h3>
                    <p  className='home-text'>Though Courses was designed with vegans in mind, this app can help anyone save courses and recipes for any dietary choice or lifestyle.</p>
                </div>
            </div> 
        )  
    }
}

export default Home;



