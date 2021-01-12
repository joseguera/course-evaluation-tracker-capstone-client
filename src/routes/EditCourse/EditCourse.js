import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TokenService from '../../services/token-service'
import CoursesContext from '../../components/context/CoursesContext';
import config from '../../config'
import '../AddCourse/AddCourse.css';

const Required = () => (
    <span className='EditCourse_required red'>*</span>
)

class EditCourse extends Component {
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

    handleChangeName = e => {
        this.setState({ course_name: e.target.value })
    };

    handleChangeSub = e => {
        this.setState({ sub: e.target.value })
    };

    handleChangeUrl = e => {
        this.setState({ url: e.target.value })
    };

    handleChangeDescription = e => {
        this.setState({ description: e.target.value })
    };

    handleChangeStyle = e => {
        e = document.getElementById("style");
        var result = e.options[e.selectedIndex].text;
        this.setState({ style: result })
    };

    handleSubmit = e => {
        e.preventDefault();
        const { courseId } = this.props.match.params;
        const { id, course_name, sub, url, description, style } = this.state;
        const newCourse = { id, course_name, sub, url, description, style };
        fetch(config.API_ENDPOINT + `/courses/${courseId}`, {
            method: 'PATCH',
            body: JSON.stringify(newCourse),
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(error => Promise.reject(error))
            })
            .then(() => {
                this.resetFields(newCourse)
                this.context.updateCourse(newCourse)
                this.props.history.push('/courselist')
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    resetFields = (newFields) => {
        this.setState({
            id: newFields.id || '',
            course_name: newFields.course_name || '',
            sub: newFields.sub || '',
            url: newFields.url || '',
            description: newFields.description || '',
            style: newFields.style || '' 

        })
    }

    handleClickCancel = () => {
        this.props.history.push('/courselist')
    }

    render() {
        const { error, course_name, sub, url, description, style } = this.state;
        return (
            <div className='edit-body'>
            <section className='EditCourse'>
                <h2 className='edit-course'>Edit Course</h2>
                <form
                    className='EditCourse_form'
                    onSubmit={this.handleSubmit}
                >
                    <div className='EditCourse_error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>
                    <input 
                        type='hidden'
                        name='id'
                    />
                    <div className='edit-fields'>
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
                            className='inputs textarea'
                            placeholder='Vegan honey'
                            required
                            value={course_name}
                            onChange={this.handleChangeName}
                        />
                    </div>
                    <div  className='edit-fields'>
                        <label htmlFor='sub'>
                            Substitution for
                            {' '}
                            <Required />
                        </label>
                        <br />
                        <input
                            type='sub'
                            name='sub'
                            id='sub'
                            className='inputs textarea'
                            placeholder='honey'
                            required
                            value={sub}
                            onChange={this.handleChangeSub}
                        />
                    </div>
                    <div className='edit-fields'>
                        <label htmlFor='url'>
                            URL
                            {' '}
                        </label>
                        <br />
                        <input
                            type='url'
                            name='url'
                            id='url'
                            className='inputs textarea'
                            placeholder='http//:www.vegan-honey.com'
                            value={url}
                            onChange={this.handleChangeUrl}
                        />
                    </div>
                    <div className='edit-fields'>
                        <label htmlFor='description'>
                            Description
                        </label>
                        <br />
                        <textarea
                            name='description'
                            id='description'
                            className='inputs textarea'
                            value={description}
                            onChange={this.handleChangeDescription}
                        />
                    </div>
                    <div className='edit-fields'>
                        <label htmlFor='style'>
                            Course Type:
                            {' '}
                            <Required />
                        </label>
                        <br />
                        <select id="style"
                            name='style'
                            className='inputs textarea'
                            value={style}
                            onChange={this.handleChangeStyle}
                        >
                            <option value="None">{style === null ? `-- Select --` : style + ` selected`}</option>
                            <option value="course">{style === `Course` ? `Recipe` : `Recipe`}</option>
                            <option value="recipe">{style === `Recipe` ? `Course` : `Course`}</option>
                        </select>
                    </div>
                    <div className='EditCourse__buttons'>
                        <button 
                            type='button'
                            onClick={this.handleClickCancel}
                            className='butts'>
                            Cancel
                        </button>
                        {' '}
                        <button type='submit' className='butts'>
                            Save
                        </button>
                    </div>
                </form>
            </section>
            </div>
        )
    }
}

export default EditCourse;