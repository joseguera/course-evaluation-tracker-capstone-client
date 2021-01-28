import React, { Component } from 'react'
import TokenService from '../../services/token-service'


import './Home.css'

class Home extends Component  {

        handleHomePage = () => {
            TokenService.clearAuthToken()
            window.location = '/'
        }

        renderLogoutHomePage() {
            return (
                <div className='HomePage__logged-in'>
                    <div className='courses-1'>
                        <h3 className='home-heading'>What is <span className='home-logo'><span className='first-C'>C</span>ourse<span className='last-C'>G</span>rader</span>?</h3>
                        <p className='home-text'>CourseGrader utilizes the <a href='https://onlinelearningconsortium.org/about/' target='_blank' rel='noreferrer'>Online Learning Consortium</a> (OLC)
                                            Scorecard as its basis for grading online courses with the purpose of improving the instructor's expertise and
                                            the students' educational experience.
                        </p>
                        <p className='home-text'>
                            <a className='reg-links' href='/login'>Log in</a> or <a className='reg-links' href='/register'>Register</a> to get started.
                        </p>
                        <p>To view a demo:<br />
                            username: <span className='login-creds'>sample</span><br />
                            password: <span className='login-creds'>Password123!</span>
                        </p>
                    </div>
                    <div className='courses-3'>
                        <h3 className='home-heading'>Better courses for all</h3>
                        <p className='home-text'>Let's help make online courses that promote learning and engage students.</p>
                    </div>
                </div>
            )
        }
    
        renderLoginHomePage() {
            return (
                <div className='HomePage__not-logged-in'>
                   <div className='courses-1'>
                        <h3 className='home-heading'>What is <span className='home-logo'><span className='first-C'>C</span>ourse<span className='last-C'>G</span>rader</span>?</h3>
                        <p className='home-text'>CourseGrader utilizes the <a href='https://onlinelearningconsortium.org/about/' target='_blank' rel='noreferrer'>Online Learning Consortium</a> (OLC)
                                            Scorecard as its basis for grading online courses with the purpose of improving the instructor's expertise and
                                            the students' educational experience.
                        </p>
                    </div>
                    <div className='courses-3'>
                        <h3 className='home-heading'>Better courses for all</h3>
                        <p className='home-text'>Let's help make online courses that promote learning and engage students.</p>
                    </div>
                </div>
            )
        }
    
        render() {
            return (
                <div className='home-body'>
                    {!TokenService.hasAuthToken()
                        ? this.renderLogoutHomePage()
                        : this.renderLoginHomePage()}
                </div>
            )
        }
}

export default Home;



