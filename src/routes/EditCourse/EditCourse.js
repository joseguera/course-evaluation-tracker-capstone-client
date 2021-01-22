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
        course_number: '',
        course_name: '',
        quarter: '',
        project_id: '',
        q1: '',
        q2: '',
        q3: '',
        q4: '',
        q5: '',
        q6: '',
        q7: '',
        q8: '',
        q9: '',
        q10: '',
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

    handleChangeName = e => {
        this.setState({ instructor_name: e.target.value })
    };

    handleChangeProgramArea = e => {
        this.setState({ program_area: e.target.value })
    };

    handleChangeCourseNumber = e => {
        this.setState({ course_number: e.target.value })
    };

    handleChangeCourseName = e => {
        this.setState({ course_name: e.target.value })
    };

    handleChangeQuarter = e => {
        this.setState({ handleChangeQuarter: e.target.value })
    };

    handleChangeProjectID = e => {
        this.setState({ project_id: e.target.value })
    };

    // Questions START //
        handleChangeQ1 = e => {
            this.setState({ q1: e.target.value })
        };
        handleChangeQ2 = e => {
            this.setState({ q2: e.target.value })
        };
        handleChangeQ3 = e => {
            this.setState({ q3: e.target.value })
        };
        handleChangeQ4 = e => {
            this.setState({ q4: e.target.value })
        };
        handleChangeQ5 = e => {
            this.setState({ q5: e.target.value })
        };
        handleChangeQ6 = e => {
            this.setState({ q6: e.target.value })
        };
        handleChangeQ7 = e => {
            this.setState({ q7: e.target.value })
        };
        handleChangeQ8 = e => {
            this.setState({ q8: e.target.value })
        };
        handleChangeQ9 = e => {
            this.setState({ q9: e.target.value })
        };
        handleChangeQ10 = e => {
            this.setState({ q10: e.target.value })
        };

    // Questions END //

    handleChangeNotes = e => {
        this.setState({ notes: e.target.value })
    };

    handleSubmit = e => {
        e.preventDefault();
        const { courseId } = this.props.match.params;
        const { id, instructor_name, program_area, course_number, course_name,
                quarter, project_id, notes,
                q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 } = this.state;
        const newCourse = { id, instructor_name, program_area, course_number, course_name,
                            quarter, project_id, notes, 
                            q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 };
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
            instructor_name: newFields.instructor_name || '',
            program_area: newFields.program_area || '',
            course_number: newFields.course_number || '',
            course_name: newFields.course_name || '',
            quarter: newFields.quarter || '',
            project_id: newFields.project_id || '',
            q1: newFields.q1 || '',
            q2: newFields.q2 || '',
            q3: newFields.q3 || '',
            q4: newFields.q4 || '',
            q5: newFields.q5 || '',
            q6: newFields.q6 || '',
            q7: newFields.q7 || '',
            q8: newFields.q8 || '',
            q9: newFields.q9 || '',
            q10: newFields.q10 || '',
            notes: newFields.notes || ''
        })
    }

    handleClickCancel = () => {
        this.props.history.push('/courselist')
    }

    render() {
        const { error, instructor_name, program_area, course_number, 
                course_name, quarter, project_id, notes,
                q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 } = this.state;
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
                            value={project_id}
                            onChange={this.handleChangeProjectID}
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
                            value={course_number}
                            onChange={this.handleChangeCourseNumber}
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
                            value={course_name}
                            onChange={this.handleChangeCourseName}
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
                            value={quarter}
                            onChange={this.handleChangeQuarter}
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
                            value={program_area}
                            onChange={this.handleChangeProgramArea}
                        />
                    </div>
                    <div className='add-fields'>
                        <label htmlFor='instructor_name'>
                            Instructor Name
                        {' '}
                        </label>
                        <br />
                        <input
                            type='text'
                            name='instructor_name'
                            id='instructor_name'
                            placeholder='e.g., Ron Howard'
                            className='inputs'
                            value={instructor_name}
                            onChange={this.handleChangeName}
                        />
                    </div>
                    {/* <div className='add-fields'>
                        <label htmlFor='instructor_name'>
                            Program Representative
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
                    </div> */}
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
                                    min='0' max='3'
                                    value={q1}
                                    onChange={this.handleChangeQ1}
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
                                    min='0' max='3'
                                    value={q2}
                                    onChange={this.handleChangeQ2}
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
                                    min='0' max='3'
                                    value={q3}
                                    onChange={this.handleChangeQ3}
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
                                    min='0' max='3'
                                    value={q4}
                                    onChange={this.handleChangeQ4}
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
                                <label htmlFor='q5'>
                                    There is consistency in the design of course navigation and utilization of course components to support student retention and quality.
                                </label>   
                            </div>
                            <div className='add-items'>
                                <input
                                    type='text'
                                    name='q5'
                                    id='q5'
                                    className='q-inputs inputs'
                                    min='0' max='3'
                                    value={q5}
                                    onChange={this.handleChangeQ5}
                                />
                            </div>
                        </div>
                        <div className="question">
                            <div className='add-labels'>
                                <label htmlFor='q6'>
                                    A process is followed that ensures that permissions (Creative Commons, Copyright, Fair Use, Public Domain, etc.) are in place for appropriate use of online course materials.
                                </label>   
                            </div>
                            <div className='add-items'>
                                <input
                                    type='text'
                                    name='q6'
                                    id='q6'
                                    className='q-inputs inputs'
                                    min='0' max='3'
                                    value={q6}
                                    onChange={this.handleChangeQ6}
                                />
                            </div>
                        </div>
                        <div className="question">
                            <div className='add-labels'>
                                <label htmlFor='q7'>
                                    Instructional materials are easily accessed by students with disabilities via alternative instructional strategies and/or referral to special institutional resources.
                                </label>   
                            </div>
                            <div className='add-items'>
                                <input
                                    type='text'
                                    name='q7'
                                    id='q7'
                                    className='q-inputs inputs'
                                    min='0' max='3'
                                    value={q7}
                                    onChange={this.handleChangeQ7}
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
                                <label htmlFor='q8'>
                                    Feedback on student assignments and questions is constructive and provided in a timely manner. (Grades/Discussions)
                                </label>   
                            </div>
                            <div className='add-items'>
                                <input
                                    type='text'
                                    name='q8'
                                    id='q8'
                                    className='q-inputs inputs'
                                    min='0' max='3'
                                    value={q8}
                                    onChange={this.handleChangeQ8}
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
                                    min='0' max='3'
                                    value={q9}
                                    onChange={this.handleChangeQ9}
                                />
                            </div>
                        </div>
                        <div className="question">
                            <div className='add-labels'>
                                <label htmlFor='q10'>
                                    Opportunities/tools are provided to encourage student-student and faculty-student collaboration/interaction (i.e., discussion boards, web conferencing, instant messaging, etc.) if appropriate.
                                </label>   
                            </div>
                            <div className='add-items'>
                                <input
                                    type='text'
                                    name='q10'
                                    id='q10'
                                    className='q-inputs inputs'
                                    min='0' max='3'
                                    value={q10}
                                    onChange={this.handleChangeQ10}
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
                            value={notes}
                            onChange={this.handleChangeNotes}
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