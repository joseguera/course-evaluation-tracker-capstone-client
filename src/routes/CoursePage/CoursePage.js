import React, { Component } from 'react';
import { Link } from 'react-router-dom'
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
        }).isRequired,
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
                    program_rep: responseData.program_rep,
                    course_number: responseData.course_number,
                    course_name: responseData.course_name,
                    quarter: responseData.quarter,
                    project_id: responseData.project_id,
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
        const { id, instructor_name, program_area, program_rep,
                course_number, course_name, quarter,
                project_id, notes } = this.state;
        return (
            <div className='main-course-page'>
            <section className='CoursePage'>
                <h2 className='CoursePage_heading'>{project_id}: {course_number} - {course_name} ({quarter})</h2>
                    <div className='page-body'>
                        <p className='program_area'>
                            <span>
                            Program Area:
                            {' '}
                            </span>
                            <br />
                            {program_area}
                        </p>
                        <p className='instructor_name'>
                            <span>
                            Instructor:
                            {' '}
                            </span>
                            <br />
                            {instructor_name}
                        </p>
                        <p className='program_rep'>
                            <span>
                            Program Representative:
                            {' '}
                            </span>
                            <br />
                            {program_rep}
                        </p>
                        <p className='notes'>
                            <span>
                            Notes:
                            {' '}
                            </span>
                            <br />
                            {notes}
                        </p>
                    </div>
                    <div className='CoursePage__buttons'>
                        <Link 
                            to={`/edit-course/${id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <button className='butts'>
                                Edit
                            </button>
                        </Link>

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