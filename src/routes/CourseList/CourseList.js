import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import NomNomsContext from '../../context/NomNomsContext';
import NomItem from '../../components/NomItem/NomItem';
import './NomList.css';

class NomList extends Component {
    static propTypes = {
        noms: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([
                    PropTypes.number,
                    PropTypes.string,
                ]).isRequired,
            })
        )
    };

    static defaultProps = {
        noms: []
    };

    static contextType = NomNomsContext;

    render() {
        const { noms } = this.context;
        return (
            <div className='main-list'>
                <div className='NomList'>
                    <h2 className='NomList_heading'>My Noms</h2>
                        <Link
                            to={'/new-nom'}
                        >
                            <button className='AddButton'>Add Nom +</button>
                        </Link>
                        {' '}
                        <ul className='NomList_list' aria-live='polite'>
                                {noms.map(nom =>
                                    <NomItem
                                        key={nom.id}
                                        {...nom}
                                    />
                                )}
                        </ul>
                </div>
            </div>
        )
    }
}

export default NomList;