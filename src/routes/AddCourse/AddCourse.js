import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NomNomsContext from '../../context/NomNomsContext';
import config from '../../config';
import TokenService from '../../services/token-service'
import './AddNom.css'

const Required = () => (
    <span className='AddNom_required red'>*</span>
)

class AddNom extends Component {
    static propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func,
        }).isRequired,
    };

    static contextType = NomNomsContext;

    state = {
        error: null,
    };

    handleSubmit = e => {
        e.preventDefault()
        var d = document.getElementById("style");
        var result = d.options[d.selectedIndex].text;
        // get the form fields from the event
        const { nom_name, sub, url, description, style } = e.target;
        const nom = {
            nom_name: nom_name.value,
            sub: sub.value,
            url: url.value,
            description: description.value,
            style: result
        }
        this.setState({ error: null })
        fetch(config.API_ENDPOINT + `/noms`, {
            method: 'POST',
            body: JSON.stringify(nom),
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
                nom_name.value = ''
                sub.value = ''
                url.value = ''
                description.value = ''
                style.value = ''
                this.context.addNom(data)
                this.props.history.push('/nomlist')
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    handleClickCancel = () => {
        this.props.history.push('/nomlist')
    }

    render() {
        const { error } = this.state;
        return (
            <div className='add-body'>
            <section className='AddNom'>
                <h2 className='make-nom'>Create a Nom</h2>
                <form
                    className='AddNom_form'
                    onSubmit={this.handleSubmit}
                >
                    <div className='AddNom_error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>
                    <div className='add-fields'>
                        <label htmlFor='nom_name'> 
                            Nom Name
                            {' '}
                            <Required />
                        </label>
                        <br />
                        <input 
                            type='text'
                            name='nom_name'
                            id='nom_name'
                            placeholder='Vegan honey'
                            className='inputs'
                            required
                        />
                    </div>
                    <div className='add-fields'>
                        <label htmlFor='sub'>
                            Substitution for
                            {' '}
                            <Required />
                        </label>
                        <br />
                        <input 
                            type='text'
                            name='sub'
                            id='sub'
                            placeholder='honey'
                            className='inputs'
                            required
                        />
                    </div>
                    <div className='add-fields'>
                        <label htmlFor='url'>
                            URL
                            {' '}
                        </label>
                        <br />
                        <input 
                            type='url'
                            name='url'
                            id='url'
                            placeholder='https://www.veganhoney.com'
                            className='inputs'
                        />
                    </div>
                    <div className='add-fields'>
                        <label htmlFor='description'>
                            Description
                        </label>
                        <br />
                        <textarea
                            name='description'
                            id='description'
                            className='inputs textarea'
                            placeholder='Vegan Honey made with apples and lemon'
                        />
                    </div>
                    <div className='add-fields'>
                        <label htmlFor='style'>
                            Nom Type:
                            {' '}
                            <Required />
                        </label>
                        <br />
                        <select 
                            id="style"
                            className='inputs'
                            required
                        >
                            {/* <option value="None">-- Select --</option> */}
                            <option value="nom">Nom</option>
                            <option value="recipe">Recipe</option>
                        </select>
                    </div>                    
                    <div className='AddNom_buttons'>
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
            </div>
        )
    }
}

export default AddNom;