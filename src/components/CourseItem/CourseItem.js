import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service'
import CoursesContext from '../../components/context/CoursesContext';
import config from '../../config';
import './CourseItem.css';

function deleteCourseRequest(courseId, cb) {
    fetch(config.API_ENDPOINT + `/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`,        
        }
    })
        .then(data => {
            cb(courseId)
            // window.location = '/courselist'
        })
        .catch(error => {
            console.error(error)
        })
}

export default function CourseItem(props) {
    return (
        <CoursesContext.Consumer>
            {(context) => (
                    <div className='CourseItem'>
                        <h3
                            className='courseItem-title'
                        >
                            <a href={`/course-page/${props.id}`}
                                className='courseItem-title'
                                style={{
                                    textDecoration: 'none',
                                    fontSize: 28,
                                }}
                            >
                                {props.course_name}
                            </a>
                        </h3>
                            <p className='CourseItem_style'>
                                {props.course_number}<br />
                                <span>Reg# {props.project_id}</span><br />
                                {props.quarter}
                            </p>
                            <a 
                                href={`/edit-course/${props.id}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <button className='butts'>
                                    Edit
                                </button>
                            </a>
                        {' '}
                        <button
                            className='butts'
                            onClick={() =>
                                deleteCourseRequest(props.id, context.deleteCourse)
                            }
                        >
                            Delete
                        </button>
                    </div>
            )}
        </CoursesContext.Consumer>
    )
}

CourseItem.defaultProps = {
    onClickDelete: () => { },
}

CourseItem.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]).isRequired,
    onClickDelete: PropTypes.func
}