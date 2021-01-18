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
        var d = document.getElementById("style");
        var result = d.options[d.selectedIndex].text;
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
                        <div class="syllabus">
                            <div class="legend">
                                <h2>Syllabus</h2>
                                <p>0 = deficient / 1 = developing / 2 = accomplished / 3 = exemplary</p>
                            </div>
                            <div class="question">
                                <div>
                                    <p>The online course includes a syllabus outlining course objectives, learning outcomes, evaluation methods, books and supplies, technical and proctoring requirements, and other related course information, making course requirements transparent.</p>
                                </div>
                                <div>
                                    <form class="options">
                                        <label for="myChoice1">0<br />
                                            <input type="radio" id="myChoice1" name="myChoice" value="0" />
                                        </label>

                                        <label for="myChoice2">1<br />
                                            <input type="radio" id="myChoice2" name="myChoice" value="1" />
                                        </label>

                                        <label for="myChoice3">2<br />
                                            <input type="radio" id="myChoice3" name="myChoice" value="2" />
                                        </label>

                                        <label for="myChoice4">3<br />
                                            <input type="radio" id="myChoice4" name="myChoice" value="3" />
                                        </label>
                                    </form>
                                </div>
                            </div>
                            <div class="question">
                                <div>
                                    <p>Lesson Plans/Weekly Assignments & Point Value of an Assignment.</p>
                                </div>
                                <div>
                                    <form class="options">
                                        <label for="myChoice1">0<br />
                                            <input type="radio" id="myChoice1" name="myChoice" value="0" />
                                        </label>

                                        <label for="myChoice2">1<br />
                                            <input type="radio" id="myChoice2" name="myChoice" value="1" />
                                        </label>

                                        <label for="myChoice3">2<br />
                                            <input type="radio" id="myChoice3" name="myChoice" value="2" />
                                        </label>

                                        <label for="myChoice4">3<br />
                                            <input type="radio" id="myChoice4" name="myChoice" value="3" />
                                        </label>
                                    </form>
                                </div>
                            </div>
                            <div class="question">
                                <div>
                                    <p>Course is designed so that students develop necessary knowledge and skills to meet measurable course and program learning outcomes.</p>
                                </div>
                                <div>
                                    <form class="options">
                                        <label for="myChoice1">0<br />
                                            <input type="radio" id="myChoice1" name="myChoice" value="0" />
                                        </label>

                                        <label for="myChoice2">1<br />
                                            <input type="radio" id="myChoice2" name="myChoice" value="1" />
                                        </label>

                                        <label for="myChoice3">2<br />
                                            <input type="radio" id="myChoice3" name="myChoice" value="2" />
                                        </label>

                                        <label for="myChoice4">3<br />
                                            <input type="radio" id="myChoice4" name="myChoice" value="3" />
                                        </label>
                                    </form>
                                </div>
                            </div>
                            <div class="question">
                                <div>
                                    <p>Expectations for assignment completion, grade policy and faculty response are clearly provided in the course syllabus.</p>
                                </div>
                                <div>
                                    <form class="options">
                                        <label for="myChoice1">0<br />
                                            <input type="radio" id="myChoice1" name="myChoice" value="0" />
                                        </label>

                                        <label for="myChoice2">1<br />
                                            <input type="radio" id="myChoice2" name="myChoice" value="1" />
                                        </label>

                                        <label for="myChoice3">2<br />
                                            <input type="radio" id="myChoice3" name="myChoice" value="2" />
                                        </label>

                                        <label for="myChoice4">3<br />
                                            <input type="radio" id="myChoice4" name="myChoice" value="3" />
                                        </label>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="Course Content">
                            <div class="legend">
                                <h2>Course Content</h2>
                                <p>0 = deficient / 1 = developing / 2 = accomplished / 3 = exemplary</p>
                            </div>
                            <div class="question">
                                <div>
                                    <p>There is consistency in the design of course navigation and utilization of course components to support student retention and quality.</p>
                                </div>
                                <div>
                                    <form class="options">
                                        <label for="myChoice1">0<br />
                                            <input type="radio" id="myChoice1" name="myChoice" value="0" />
                                        </label>

                                        <label for="myChoice2">1<br />
                                            <input type="radio" id="myChoice2" name="myChoice" value="1" />
                                        </label>

                                        <label for="myChoice3">2<br />
                                            <input type="radio" id="myChoice3" name="myChoice" value="2" />
                                        </label>

                                        <label for="myChoice4">3<br />
                                            <input type="radio" id="myChoice4" name="myChoice" value="3" />
                                        </label>
                                    </form>
                                </div>
                            </div>
                            <div class="question">
                                <div>
                                    <p>A process is followed that ensures that permissions (Creative Commons, Copyright, Fair Use, Public Domain, etc.) are in place for appropriate use of online course materials.</p>
                                </div>
                                <div>
                                    <form class="options">
                                        <label for="myChoice1">0<br />
                                            <input type="radio" id="myChoice1" name="myChoice" value="0" />
                                        </label>

                                        <label for="myChoice2">1<br />
                                            <input type="radio" id="myChoice2" name="myChoice" value="1" />
                                        </label>

                                        <label for="myChoice3">2<br />
                                            <input type="radio" id="myChoice3" name="myChoice" value="2" />
                                        </label>

                                        <label for="myChoice4">3<br />
                                            <input type="radio" id="myChoice4" name="myChoice" value="3" />
                                        </label>
                                    </form>
                                </div>
                            </div>
                            <div class="question">
                                <div>
                                    <p>Instructional materials are easily accessed by students with disabilities via alternative instructional strategies and/or referral to special institutional resources.</p>
                                </div>
                                <div>
                                    <form class="options">
                                        <label for="myChoice1">0<br />
                                            <input type="radio" id="myChoice1" name="myChoice" value="0" />
                                        </label>

                                        <label for="myChoice2">1<br />
                                            <input type="radio" id="myChoice2" name="myChoice" value="1" />
                                        </label>

                                        <label for="myChoice3">2<br />
                                            <input type="radio" id="myChoice3" name="myChoice" value="2" />
                                        </label>

                                        <label for="myChoice4">3<br />
                                            <input type="radio" id="myChoice4" name="myChoice" value="3" />
                                        </label>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="student-teacher">
                            <div class="legend">
                                <h2>Student/Teacher Interaction</h2>
                                <p>0 = deficient / 1 = developing / 2 = accomplished / 3 = exemplary</p>
                            </div>
                            <div class="question">
                                <div>
                                    <p>Feedback on student assignments and questions is constructive and provided in a timely manner. (Grades/Discussions)</p>
                                </div>
                                <div>
                                    <form class="options">
                                        <label for="myChoice1">0<br />
                                            <input type="radio" id="myChoice1" name="myChoice" value="0" />
                                        </label>

                                        <label for="myChoice2">1<br />
                                            <input type="radio" id="myChoice2" name="myChoice" value="1" />
                                        </label>

                                        <label for="myChoice3">2<br />
                                            <input type="radio" id="myChoice3" name="myChoice" value="2" />
                                        </label>

                                        <label for="myChoice4">3<br />
                                            <input type="radio" id="myChoice4" name="myChoice" value="3" />
                                        </label>
                                    </form>
                                </div>
                            </div>
                            <div class="question">
                                <div>
                                    <p>Instructors use effective strategies to create a presence in the course.</p>
                                </div>
                                <div>
                                    <form class="options">
                                        <label for="myChoice1">0<br />
                                            <input type="radio" id="myChoice1" name="myChoice" value="0" />
                                        </label>

                                        <label for="myChoice2">1<br />
                                            <input type="radio" id="myChoice2" name="myChoice" value="1" />
                                        </label>

                                        <label for="myChoice3">2<br />
                                            <input type="radio" id="myChoice3" name="myChoice" value="2" />
                                        </label>

                                        <label for="myChoice4">3<br />
                                            <input type="radio" id="myChoice4" name="myChoice" value="3" />
                                        </label>
                                    </form>
                                </div>
                            </div>
                            <div class="question">
                                <div>
                                    <p>Instructors use effective strategies to create a presence in the course.</p>
                                </div>
                                <form class="options">
                                    <label for="myChoice1">0<br />
                                        <input type="radio" id="myChoice1" name="myChoice" value="0" />
                                    </label>

                                    <label for="myChoice2">1<br />
                                        <input type="radio" id="myChoice2" name="myChoice" value="1" />
                                    </label>

                                    <label for="myChoice3">2<br />
                                        <input type="radio" id="myChoice3" name="myChoice" value="2" />
                                    </label>

                                    <label for="myChoice4">3<br />
                                        <input type="radio" id="myChoice4" name="myChoice" value="3" />
                                    </label>
                                </form>
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