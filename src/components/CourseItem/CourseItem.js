import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service'
import NomNomsContext from '../../context/NomNomsContext';
import config from '../../config';
import './NomItem.css';

function deleteNomRequest(nomId, cb) {
    fetch(config.API_ENDPOINT + `/noms/${nomId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`,        
        }
    })
        .then(data => {
            cb(nomId)
            // window.location = '/nomlist'
        })
        .catch(error => {
            console.error(error)
        })
}

export default function NomItem(props) {
    return (
        <NomNomsContext.Consumer>
            {(context) => (
                <li className='NomItem'>
                    <div>
                        <h3>
                            <Link to={`/nom-page/${props.id}`}
                                style={{
                                    color: '#b37400',
                                    textDecoration: 'none',
                                    fontSize: 28,
                                }}
                            >
                                {props.nom_name}
                            </Link>
                        </h3>
                    </div>
                    <p className='NomItem_style'>
                        {props.style}
                    </p>
                    <div>
                            <Link 
                                to={`/edit-nom/${props.id}`}
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
                                deleteNomRequest(props.id, context.deleteNom)
                            }
                        >
                            Delete
                        </button>
                    </div>
                </li>
            )}
        </NomNomsContext.Consumer>
    )
}

NomItem.defaultProps = {
    onClickDelete: () => { },
}

NomItem.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]).isRequired,
    nom_name: PropTypes.string.isRequired,
    sub: PropTypes.string.isRequired,
    url: PropTypes.string,
    desciption: PropTypes.string,
    onClickDelete: PropTypes.func,
}