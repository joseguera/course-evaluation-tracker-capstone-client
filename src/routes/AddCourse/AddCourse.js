import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CoursesContext from '../../components/context/CoursesContext';
import config from '../../config';
import TokenService from '../../services/token-service'
import './AddCourse.css'

const Required = () => (
    <span className='AddCourse_required red'>*</span>
)

class AddCourse extends Component {
    static propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func,
        }).isRequired,
    };

    static contextType = CoursesContext;

    state = {
        error: null,
    };

    handleSubmit = e => {
        e.preventDefault()
        // var d = document.getElementById("style");
        // var result = d.options[d.selectedIndex].text;
        // get the form fields from the event
        const { instructor_name, program_area, program_rep, course_number,
                course_name, quarter, project_id, notes } = e.target;
        
        const course = {
            instructor_name: instructor_name.value,
            program_area: program_area.value,
            program_rep: program_rep.value,
            course_number: course_number.value,
            course_name: course_name.value,
            quarter: quarter.value,
            project_id: project_id.value,
            notes: notes.value
        }
        this.setState({ error: null })
        fetch(config.API_ENDPOINT + `/courses`, {
            method: 'POST',
            body: JSON.stringify(course),
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
                return res.json()
            })
            .then(data => {
                instructor_name.value = ''
                program_area.value = ''
                program_rep.value = ''
                course_number.value = ''
                course_name.value = ''
                quarter.value = ''
                project_id.value = ''
                notes.value = ''
                this.context.addCourse(data)
                this.props.history.push('/courselist')
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    handleClickCancel = () => {
        this.props.history.push('/courselist')
    }

    render() {
        const { error } = this.state;
        return (
            <div className='add-body'>
            <section className='AddCourse'>
                <h2 className='make-course'>Create a Course</h2>
                <form
                    className='AddCourse_form'
                    onSubmit={this.handleSubmit}
                >
                    <div className='AddCourse_error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>
                    <div className='add-fields'>
                        <label htmlFor='project_id'> 
                            Project ID
                            {' '}
                            <Required />
                        </label>
                        <br />
                        <input 
                            type='text'
                            name='project_id'
                            id='project_id'
                            placeholder='e.g., 375565'
                            className='inputs'
                            required
                        />
                    </div>
                    <div className='add-fields'>
                        <label htmlFor='course_number'> 
                            Course Number
                            {' '}
                            <Required />
                        </label>
                        <br />
                        <input 
                            type='text'
                            name='course_number'
                            id='course_number'
                            placeholder='e.g., MGMT X 495.6'
                            className='inputs'
                            required
                        />
                    </div>
                    <div className='add-fields'>
                        <label htmlFor='course_name'> 
                            Course Title
                            {' '}
                            <Required />
                        </label>
                        <br />
                        <input 
                            type='text'
                            name='course_name'
                            id='course_name'
                            placeholder='e.g., Intro to Budgeting'
                            className='inputs'
                            required
                        />
                    </div>
                    <div className='add-fields'>
                        <label htmlFor='quarter'> 
                            Quarter
                            {' '}
                            <Required />
                        </label>
                        <br />
                        <input 
                            type='text'
                            name='quarter'
                            id='quarter'
                            placeholder='e.g., Winter 2021'
                            className='inputs'
                            required
                        />
                    </div>
                    <div className='add-fields'>
                        <label htmlFor='program_area'>
                            Program Area
                            {' '}
                            <Required />
                        </label>
                        <br />
                        <input 
                            type='text'
                            name='program_area'
                            id='program_area'
                            placeholder='e.g, LMC'
                            className='inputs'
                            required
                        />
                    </div>
                    <div className='add-fields'>
                        <label htmlFor='instructor_name'>
                            Instructor Name:
                            {' '}
                        </label>
                        <br />
                        <input 
                            type='text'
                            name='instructor_name'
                            id='instructor_name'
                            placeholder='e.g., Ron Howard'
                            className='inputs'
                        />
                    </div>
                    <div className='add-fields'>
                        <label htmlFor='instructor_name'>
                            Program Representative:
                            {' '}
                        </label>
                        <br />
                        <input 
                            type='text'
                            name='instructor_name'
                            id='instructor_name'
                            placeholder='e.g., Henry Winkler'
                            className='inputs'
                        />
                    </div>
                    <div className='add-fields'>
                        <label htmlFor='notes'>
                            Notes
                            {' '}
                        </label>
                        <br />
                        <textarea
                            name='notes'
                            id='notes'
                            className='inputs textarea'
                            placeholder='e.g., missing grades (01/12/2021)'
                        />
                    </div>                    
                    <div className='AddCourse_buttons'>
                        <button 
                            type='button'
                            onClick={this.handleClickCancel}
                            className='butts'>
                            Cancel
                        </button>
                        {' '}
                        <button 
                            type='submit'
                            className='butts'>
                            Save
                        </button>
                    </div>
                </form>
            </section>
            </div>
        )
    }
}

export default AddCourse;