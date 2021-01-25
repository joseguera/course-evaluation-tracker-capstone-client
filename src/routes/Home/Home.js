import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Home.css'

class Home extends Component  {
    
    render() {
        return (
            <div className='home-body'>
                <div className='courses-1'>
                    <h3 className='home-heading'>What is <span className='home-logo'><span className='first-C'>C</span>ourse<span className='last-C'>G</span>rader</span>?</h3>
                    <p className='home-text'>CourseGrader utilizes the <a href='https://onlinelearningconsortium.org/about/' target='_blank' rel='noreferrer'>Online Learning Consortium</a> (OLC)
                                            Scorecard as its basis for grading online courses with the purpose of improving the instructor's expertise and
                                            the students' educational experience.
                    </p>
                    <p  className='home-text'>
                        <Link className='reg-links' to='/login'>Log in</Link> or <Link className='reg-links' to='/register'>Register</Link> to get started.</p>
                    <p>To view a demo:<br/>
                        username: <span className='login-creds'>sample</span><br/>
                        password: <span className='login-creds'>Password123!</span>
                    </p>
                </div>
                <div className='courses-3'>
                    <h3 className='home-heading'>Better courses for all</h3>
                    <p  className='home-text'>Let's help make online courses that promote learning and engage students.</p>
                </div>
            </div> 
        )  
    }
}

export default Home;



