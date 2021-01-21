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
        first_name: 'jose',
        last_name: 'luis'
    };

    componentDidMount() {

        /////////// GET user ID START ///////////////


        fetch(config.API_ENDPOINT + `/users`, {
            method: 'GET',
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
            .then(responseData => {
                this.setState({
                    id: responseData.id,
                    first_name: responseData.first_name,
                    last_name: responseData.last_name,
                    username: responseData.username
                })
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
        /////////// GET user ID STOP ///////////////
    }

    handleSubmit = e => {
        e.preventDefault()

        // get the form fields from the event
        const { instructor_name, program_area, course_number,
            course_name, quarter, project_id, notes } = e.target;
        const { first_name, last_name } = this.state;
        console.log(first_name, last_name);

            // console.log(instructor_name, program_area, course_number,
            //     course_name, quarter, project_id, notes);
        const course = {
            instructor_name: instructor_name.value,
            program_area: program_area.value,
            // program_rep: program_rep.value,
            course_number: course_number.value,
            course_name: course_name.value,
            quarter: quarter.value,
            project_id: project_id.value,
            notes: notes.value,
            // total: total.value
        }
        this.setState({ error: null })
        // console.log("hello");

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
                console.log(data);







                
                /////////// POST questions ID START ///////////////
                // fetch(config.API_ENDPOINT + `/questions`, {
                //     method: 'POST',
                //     body: JSON.stringify(course),
                //     headers: {
                //         'content-type': 'application/json',
                //         'authorization': `bearer ${TokenService.getAuthToken()}`,
                //     }
                // })
                //     .then(res => {
                //         if (!res.ok) {
                //             return res.json().then(error => Promise.reject(error))
                //         }
                //         return res.json()
                //     })
                //     .then(data => {
                //         console.log(data);
                        
                //         instructor_name.value = ''
                //         program_area.value = ''
                //         // program_rep.value = ''
                //         course_number.value = ''
                //         course_name.value = ''
                //         quarter.value = ''
                //         project_id.value = ''
                //         notes.value = ''
                //         // total.value = '';
                //         this.context.addCourse(data)
                //         this.props.history.push('/courselist')
                //     })
                //     .catch(error => {
                //         console.error(error)
                //         this.setState({ error })
                    // })
                /////////// POST questions ID STOP ///////////////

























                








                instructor_name.value = ''
                program_area.value = ''
                // program_rep.value = ''
                course_number.value = ''
                course_name.value = ''
                quarter.value = ''
                project_id.value = ''
                notes.value = ''
                // total.value = '';
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
        const { first_name, last_name } = this.state;
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
                        <input 
                        type='hidden'
                        name='id'
                    />

                        <div className='add-fields'>
                            <label htmlFor='project_id'>
                                Registration Number
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
                                placeholder='e.g., LMC'
                                className='inputs'
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
                                placeholder='e.g., Ron Howard'
                                className='inputs'
                            />
                            {/* <span>{first_name} {last_name}</span> */}
                        </div>
                        <div className="syllabus">
                            <div className="legend">
                                <h2 className='legend-item'>Syllabus</h2>
                                <p className='legend-item'>0 = deficient / 1 = developing / 2 = accomplished / 3 = exemplary</p>
                                
                            </div>
                            <div className="question">
                                <div className='add-labels'>
                                    <label htmlFor='q1'>
                                        The online course includes a syllabus outlining course objectives, learning outcomes, evaluation methods, books and supplies, technical and proctoring requirements, and other related course information, making course requirements transparent.
                                    </label>
                                </div>
                                <div className='add-items'>
                                    <input
                                        type='text'
                                        name='q1'
                                        id='q1'
                                        className='q-inputs inputs'
                                        min='1' max='5'
                                    />
                                </div>
                            </div>
                            <div className="question">
                                <div className='add-labels'>
                                    <label htmlFor='q2'>
                                        Lesson Plans/Weekly Assignments & Point Value of an Assignment.
                                    </label>   
                                </div>
                                <div className='add-items'>
                                    <input
                                        type='text'
                                        name='q2'
                                        id='q2'
                                        className='q-inputs inputs'
                                        min='1' max='5'
                                    />
                                </div>
                            </div>
                            <div className="question">
                                <div className='add-labels'>
                                    <label htmlFor='q3'>
                                        Course is designed so that students develop necessary knowledge and skills to meet measurable course and program learning outcomes.
                                    </label>   
                                </div>
                                <div className='add-items'>
                                    <input
                                        type='text'
                                        name='q3'
                                        id='q3'
                                        className='q-inputs inputs'
                                        min='1' max='5'
                                    />
                                </div>
                            </div>
                            <div className="question">
                                <div className='add-labels'>
                                    <label htmlFor='q4'>
                                        Expectations for assignment completion, grade policy and faculty response are clearly provided in the course syllabus.
                                    </label>   
                                </div>
                                <div className='add-items'>
                                    <input
                                        type='text'
                                        name='q4'
                                        id='q4'
                                        className='q-inputs inputs'
                                        min='1' max='5'
                                    />
                                </div>
                            </div>    
                        </div>

                        <div className="course-content">
                            <div className="legend">
                                <h2>Course Content</h2>
                                <p>0 = deficient / 1 = developing / 2 = accomplished / 3 = exemplary</p>
                            </div>
                            <div className="question">
                                <div className='add-labels'>
                                    <label htmlFor='q4'>
                                        There is consistency in the design of course navigation and utilization of course components to support student retention and quality.
                                    </label>   
                                </div>
                                <div className='add-items'>
                                    <input
                                        type='text'
                                        name='q4'
                                        id='q4'
                                        className='q-inputs inputs'
                                        min='1' max='5'
                                    />
                                </div>
                            </div>
                            <div className="question">
                                <div className='add-labels'>
                                    <label htmlFor='q5'>
                                        A process is followed that ensures that permissions (Creative Commons, Copyright, Fair Use, Public Domain, etc.) are in place for appropriate use of online course materials.
                                    </label>   
                                </div>
                                <div className='add-items'>
                                    <input
                                        type='text'
                                        name='q5'
                                        id='q5'
                                        className='q-inputs inputs'
                                        min='1' max='5'
                                    />
                                </div>
                            </div>
                            <div className="question">
                                <div className='add-labels'>
                                    <label htmlFor='q6'>
                                        Instructional materials are easily accessed by students with disabilities via alternative instructional strategies and/or referral to special institutional resources.
                                    </label>   
                                </div>
                                <div className='add-items'>
                                    <input
                                        type='text'
                                        name='q6'
                                        id='q6'
                                        className='q-inputs inputs'
                                        min='1' max='5'
                                    />
                                </div>
                            </div>  
                        </div>

                        <div className="student-teacher">
                            <div className="legend">
                                <h2>Student/Teacher Interaction</h2>
                                <p>0 = deficient / 1 = developing / 2 = accomplished / <br />3 = exemplary</p>
                            </div>

                            <div className="question">
                                <div className='add-labels'>
                                    <label htmlFor='q7'>
                                        Feedback on student assignments and questions is constructive and provided in a timely manner. (Grades/Discussions)
                                    </label>   
                                </div>
                                <div className='add-items'>
                                    <input
                                        type='text'
                                        name='q7'
                                        id='q7'
                                        className='q-inputs inputs'
                                        min='1' max='5'
                                    />
                                </div>
                            </div>
                            <div className="question">
                                <div className='add-labels'>
                                    <label htmlFor='q8'>
                                        Instructors use effective strategies to create a presence in the course.
                                    </label>   
                                </div>
                                <div className='add-items'>
                                    <input
                                        type='text'
                                        name='q8'
                                        id='q8'
                                        className='q-inputs inputs'
                                        min='1' max='5'
                                    />
                                </div>
                            </div>
                            <div className="question">
                                <div className='add-labels'>
                                    <label htmlFor='q9'>
                                        Instructors use effective strategies to create a presence in the course.
                                    </label>   
                                </div>
                                <div className='add-items'>
                                    <input
                                        type='text'
                                        name='q9'
                                        id='q9'
                                        className='q-inputs inputs'
                                        min='1' max='5'
                                    />
                                </div>
                            </div> 
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
            </div >
        )
    }
}

export default AddCourse;