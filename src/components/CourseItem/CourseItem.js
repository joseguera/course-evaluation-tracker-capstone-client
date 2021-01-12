import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service'
import CoursesContext from '../../context/CoursesContext';
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
                <li className='CourseItem'>
                    <div>
                        <h3>
                            <Link to={`/course-page/${props.id}`}
                                style={{
                                    color: '#b37400',
                                    textDecoration: 'none',
                                    fontSize: 28,
                                }}
                            >
                                {props.course_name}
                            </Link>
                        </h3>
                    </div>
                    <p className='CourseItem_style'>
                        {props.style}
                    </p>
                    <div>
                            <Link 
                                to={`/edit-course/${props.id}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <button className='butts'>
                                    Edit
                                </button>
                            </Link>
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
                </li>
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
    course_name: PropTypes.string.isRequired,
    sub: PropTypes.string.isRequired,
    url: PropTypes.string,
    desciption: PropTypes.string,
    onClickDelete: PropTypes.func,
}