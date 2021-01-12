import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'
import { Input, Required } from '../Utils/Utils'
import '../../components/RegistrationForm/RegistrationForm.css'


export default class LoginForm extends Component {
    static defaultProps = {
        onLoginSuccess: () => { }
    }

    state = { error: null }

    handleSubmitBasicAuth = ev => {
        ev.preventDefault()
        const { username, password } = ev.target

        TokenService.saveAuthToken(
            TokenService.makeBasicAuthToken(username.value, password.value)
        )

        username.value = ''
        password.value = ''
        this.props.onLoginSuccess()
    }

    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        const { username, password } = ev.target

        AuthApiService.postLogin({
            username: username.value,
            password: password.value,
        })
            .then(res => {
                username.value = ''
                password.value = ''
                TokenService.saveAuthToken(res.authToken)
                this.props.onLoginSuccess()
                this.props.history.push('/')
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        const { error } = this.state
        return (
            <form
                className='LoginForm'
                onSubmit={this.handleSubmitJwtAuth}
            >
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div className='username fields'>
                    <label htmlFor='LoginForm__username'>
                        Username <Required />
                    </label>
                    <Input
                        required
                        name='username'
                        id='LoginForm__username'>
                    </Input>
                </div>
                <div className='password fields'>
                    <label htmlFor='LoginForm__password'>
                        Password <Required />
                    </label>
                    <Input
                        required
                        name='password'
                        type='password'
                        id='LoginForm__password'>
                    </Input>
                </div>
                <button type='submit' className='butts'>
                    Login
                </button>
            </form>
        )
    }
}
