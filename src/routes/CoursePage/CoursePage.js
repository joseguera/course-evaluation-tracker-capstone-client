import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TokenService from '../../services/token-service'
import CoursesContext from '../../components/context/CoursesContext';
import config from '../../config'
import './CoursePage.css';

class CoursePage extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.object,
        }),
        history: PropTypes.shape({
            push: PropTypes.func,
        }),
    };

    static contextType = CoursesContext;

    state = {
        error: null,
        id: '',
        instructor_name: '',
        program_area: '',
        program_rep: '',
        course_number: '',
        course_name: '',
        quarter: '',
        project_id: '',
        notes: ''
    };

    componentDidMount() {
        const { courseId } = this.props.match.params;
        fetch(config.API_ENDPOINT + `/courses/${courseId}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'authorization': `bearer ${TokenService.getAuthToken()}`,            
            }
        })
            .then(res => {
                if(!res.ok)
                    return res.json().then(error => Promise.reject(error))

                return res.json()
            })
            .then(responseData => {
                this.setState({
                    id: responseData.id,
                    instructor_name: responseData.instructor_name,
                    program_area: responseData.program_area,
                    course_number: responseData.course_number,
                    course_name: responseData.course_name,
                    program_rep: responseData.program_rep,
                    quarter: responseData.quarter,
                    project_id: responseData.project_id,
                    q1: responseData.q1, 
                    q2: responseData.q2, 
                    q3: responseData.q3, 
                    q4: responseData.q4, 
                    q5: responseData.q5, 
                    q6: responseData.q6, 
                    q7: responseData.q7, 
                    q8: responseData.q8, 
                    q9: responseData.q9, 
                    q10: responseData.q10,
                    notes: responseData.notes
                })
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    handleClickBack = () => {
        this.props.history.push('/courselist')
    }

    render() {
        const { id, instructor_name, program_area,
                course_number, course_name, program_rep, quarter, project_id,
                q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, 
                notes } = this.state;
        return (
            <div className='main-course-page'>
            <section className='CoursePage'>
                <h2 className='CoursePage_heading'>{project_id}: {course_number} <br /> 
                    {course_name} <br />
                    ({quarter})
                </h2>
                    <div className='page-body'>
                        <div className='page-line'>
                            <p className='course-labels'>
                                Program Area:&nbsp;
                            </p>
                            <span className='course-data'>
                                    {program_area}
                            </span>
                        </div>
                        <div className='page-line'>
                            <p className='course-labels'>
                                Course Number:&nbsp;
                            </p>
                            <span className='course-data'>
                                    {course_number}
                            </span>
                        </div>
                        <div className='page-line'>
                            <p className='course-labels'>
                                Program Representative:&nbsp;
                            </p>
                            <span className='course-data'>
                                    {program_rep}
                            </span>
                        </div>
                        <div className='page-line'>
                            <p className='course-labels'>
                                Instructor:&nbsp;
                            </p>
                            <span className='course-data'>
                                    {instructor_name}
                            </span>
                        </div>
                        <div className='page-line'>
                            <p className='course-labels'>
                                Total Score:&nbsp;
                            </p>
                            <span className='course-data'>
                                    {q1 + q2 + q3 + q4 + q5 + q6 + q7 + q8 + q9 + q10}
                            </span>
                        </div>
                        <div className='page-line'>
                            <p className='course-labels'>
                                Notes:
                            </p>
                            <span className='course-data'>
                                    {notes}
                            </span>
                        </div>
                    </div>
                    <div className='CoursePage__buttons'>
                        <a 
                            href={`/edit-course/${id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <button className='butts'>
                                Edit
                            </button>
                        </a>
                        {' '}
                        <button 
                            type='button'
                            onClick={this.handleClickBack}
                            className='butts'
                        >
                            Back
                        </button>
                    </div>
            </section>
            </div>
        )
    }
}

export default CoursePage;