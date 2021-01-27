import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import CoursesContext from '../../components/context/CoursesContext';
import CourseItem from '../../components/CourseItem/CourseItem';
import './CourseList.css';

class CourseList extends Component {
    static propTypes = {
        courses: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([
                    PropTypes.number,
                    PropTypes.string,
                ]).isRequired,
            })
        )
    };

    static defaultProps = {
        courses: []
    };

    static contextType = CoursesContext;

    render() {
        const { courses } = this.context;
        return (
            <div className='main-list'>
                <div className='CourseList'>
                    <h2 className='CourseList_heading'>My Courses</h2>
                        <a
                            href={'/new-course'}
                        >
                            <button className='AddButton'>Add Course +</button>
                        </a>
                        {' '}
                        <div className='CourseList_list' aria-live='polite'>
                                {courses.map(course =>
                                    <CourseItem
                                        key={course.id}
                                        {...course}
                                    />
                                )}
                        </div>
                </div>
            </div>
        )
    }
}

export default CourseList;