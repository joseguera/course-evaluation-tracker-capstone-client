import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import TokenService from '../../services/token-service'
import CoursesContext from '../../components/context/CoursesContext';
import config from '../../config'
import './CoursePage.css';

class CoursePage extends Component {
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
        course_name: '',
        sub: '',
        url: '',
        description: '',
        style: ''
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
                    course_name: responseData.course_name,
                    sub: responseData.sub,
                    url: responseData.url,
                    description: responseData.description,
                    style: responseData.style
                })
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    handleClickBack = () => {
        this.props.history.push('/courselist')
    }

    render() {
        const { id, course_name, sub, url, description, style } = this.state;
        return (
            <div className='main-course-page'>
            <section className='CoursePage'>
                <h2 className='CoursePage_heading'>{course_name}</h2>
                    <div className='page-body'>
                        <p className='sub'>
                            <span>
                            Substitution for:
                            {' '}
                            </span>
                            <br />
                            {sub}
                        </p>
                        <p className='url'>
                            <span>
                            URL:
                            {' '}
                            </span>
                            <br />
                            <a href={url} target='_blank' rel='noreferrer'>{url}</a>
                        </p>
                        <p className='description'>
                            <span>
                            Description:
                            {' '}
                            </span>
                            <br />
                            {description}
                        </p>
                        <p className='style'>
                            <span>
                            Course Type:
                            {' '}
                            </span>
                            <br />
                            {style ? style : `No Course type was selected`}
                        </p>
                    </div>
                    <div className='CoursePage__buttons'>
                        <Link 
                            to={`/edit-course/${id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <button className='butts'>
                                Edit
                            </button>
                        </Link>

                        {' '}
                        <button 
                            type='button'
                            onClick={this.handleClickBack}
                            className='butts'
                        >
                            Back
                        </button>
                    </div>
            </section>
            </div>
        )
    }
}

export default CoursePage;