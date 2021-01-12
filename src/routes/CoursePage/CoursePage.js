import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import TokenService from '../../services/token-service'
import NomNomsContext from '../../context/NomNomsContext';
import config from '../../config'
import './NomPage.css';

class NomPage extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.object,
        }),
        history: PropTypes.shape({
            push: PropTypes.func,
        }).isRequired,
    };

    static contextType = NomNomsContext;

    state = {
        error: null,
        id: '',
        nom_name: '',
        sub: '',
        url: '',
        description: '',
        style: ''
    };

    componentDidMount() {
        const { nomId } = this.props.match.params;
        fetch(config.API_ENDPOINT + `/noms/${nomId}`, {
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
                    nom_name: responseData.nom_name,
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
        this.props.history.push('/nomlist')
    }

    render() {
        const { id, nom_name, sub, url, description, style } = this.state;
        return (
            <div className='main-nom-page'>
            <section className='NomPage'>
                <h2 className='NomPage_heading'>{nom_name}</h2>
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
                            Nom Type:
                            {' '}
                            </span>
                            <br />
                            {style ? style : `No Nom type was selected`}
                        </p>
                    </div>
                    <div className='NomPage__buttons'>
                        <Link 
                            to={`/edit-nom/${id}`}
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

export default NomPage;