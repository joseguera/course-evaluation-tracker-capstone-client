import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TokenService from '../../services/token-service'
import NomNomsContext from '../../context/NomNomsContext';
import config from '../../config'
import '../AddNom/AddNom.css';

const Required = () => (
    <span className='EditNom_required red'>*</span>
)

class EditNom extends Component {
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

    handleChangeName = e => {
        this.setState({ nom_name: e.target.value })
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
        const { nomId } = this.props.match.params;
        const { id, nom_name, sub, url, description, style } = this.state;
        const newNom = { id, nom_name, sub, url, description, style };
        fetch(config.API_ENDPOINT + `/noms/${nomId}`, {
            method: 'PATCH',
            body: JSON.stringify(newNom),
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
                this.resetFields(newNom)
                this.context.updateNom(newNom)
                this.props.history.push('/nomlist')
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    resetFields = (newFields) => {
        this.setState({
            id: newFields.id || '',
            nom_name: newFields.nom_name || '',
            sub: newFields.sub || '',
            url: newFields.url || '',
            description: newFields.description || '',
            style: newFields.style || '' 

        })
    }

    handleClickCancel = () => {
        this.props.history.push('/nomlist')
    }

    render() {
        const { error, nom_name, sub, url, description, style } = this.state;
        return (
            <div className='edit-body'>
            <section className='EditNom'>
                <h2 className='edit-nom'>Edit Nom</h2>
                <form
                    className='EditNom_form'
                    onSubmit={this.handleSubmit}
                >
                    <div className='EditNom_error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>
                    <input 
                        type='hidden'
                        name='id'
                    />
                    <div className='edit-fields'>
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
                            className='inputs textarea'
                            placeholder='Vegan honey'
                            required
                            value={nom_name}
                            onChange={this.handleChangeName}
                        />
                    </div>
                    <div  className='edit-fields'>
                        <label htmlFor='sub'>
                            Substitution for
                            {' '}
                            <Required />
                        </label>
                        <br />
                        <input
                            type='sub'
                            name='sub'
                            id='sub'
                            className='inputs textarea'
                            placeholder='honey'
                            required
                            value={sub}
                            onChange={this.handleChangeSub}
                        />
                    </div>
                    <div className='edit-fields'>
                        <label htmlFor='url'>
                            URL
                            {' '}
                        </label>
                        <br />
                        <input
                            type='url'
                            name='url'
                            id='url'
                            className='inputs textarea'
                            placeholder='http//:www.vegan-honey.com'
                            value={url}
                            onChange={this.handleChangeUrl}
                        />
                    </div>
                    <div className='edit-fields'>
                        <label htmlFor='description'>
                            Description
                        </label>
                        <br />
                        <textarea
                            name='description'
                            id='description'
                            className='inputs textarea'
                            value={description}
                            onChange={this.handleChangeDescription}
                        />
                    </div>
                    <div className='edit-fields'>
                        <label htmlFor='style'>
                            Nom Type:
                            {' '}
                            <Required />
                        </label>
                        <br />
                        <select id="style"
                            name='style'
                            className='inputs textarea'
                            value={style}
                            onChange={this.handleChangeStyle}
                        >
                            <option value="None">{style === null ? `-- Select --` : style + ` selected`}</option>
                            <option value="nom">{style === `Nom` ? `Recipe` : `Recipe`}</option>
                            <option value="recipe">{style === `Recipe` ? `Nom` : `Nom`}</option>
                        </select>
                    </div>
                    <div className='EditNom__buttons'>
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

export default EditNom;