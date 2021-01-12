import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CoursesContext from '../../context/CoursesContext';
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
        var d = document.getElementById("style");
        var result = d.options[d.selectedIndex].text;
        // get the form fields from the event
        const { course_name, sub, url, description, style } = e.target;
        const course = {
            course_name: course_name.value,
            sub: sub.value,
            url: url.value,
            description: description.value,
            style: result
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
                course_name.value = ''
                sub.value = ''
                url.value = ''
                description.value = ''
                style.value = ''
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
                        <label htmlFor='course_name'> 
                            Course Name
                            {' '}
                            <Required />
                        </label>
                        <br />
                        <input 
                            type='text'
                            name='course_name'
                            id='course_name'
                            placeholder='Vegan honey'
                            className='inputs'
                            required
                        />
                    </div>
                    <div className='add-fields'>
                        <label htmlFor='sub'>
                            Substitution for
                            {' '}
                            <Required />
                        </label>
                        <br />
                        <input 
                            type='text'
                            name='sub'
                            id='sub'
                            placeholder='honey'
                            className='inputs'
                            required
                        />
                    </div>
                    <div className='add-fields'>
                        <label htmlFor='url'>
                            URL
                            {' '}
                        </label>
                        <br />
                        <input 
                            type='url'
                            name='url'
                            id='url'
                            placeholder='https://www.veganhoney.com'
                            className='inputs'
                        />
                    </div>
                    <div className='add-fields'>
                        <label htmlFor='description'>
                            Description
                        </label>
                        <br />
                        <textarea
                            name='description'
                            id='description'
                            className='inputs textarea'
                            placeholder='Vegan Honey made with apples and lemon'
                        />
                    </div>
                    <div className='add-fields'>
                        <label htmlFor='style'>
                            Course Type:
                            {' '}
                            <Required />
                        </label>
                        <br />
                        <select 
                            id="style"
                            className='inputs'
                            required
                        >
                            {/* <option value="None">-- Select --</option> */}
                            <option value="course">Course</option>
                            <option value="recipe">Recipe</option>
                        </select>
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