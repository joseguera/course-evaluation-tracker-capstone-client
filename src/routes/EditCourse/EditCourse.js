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