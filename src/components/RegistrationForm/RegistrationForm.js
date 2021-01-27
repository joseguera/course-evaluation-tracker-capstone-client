import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Required } from '../Utils/Utils'
import AuthApiService from '../../services/auth-api-service'
import './RegistrationForm.css'

export default class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    const { first_name, last_name, username, password } = ev.target

    this.setState({ error: null })
    AuthApiService.postUser({
      first_name: first_name.value,
      last_name: last_name.value,
      username: username.value,
      password: password.value
    })
      .then(user => {
        first_name.value = ''
        last_name.value = ''
        username.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
        this.props.history.push('/login')
        window.location = '/login'
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state
    return (
      <div className='form-body'>
      <form
        className='RegistrationForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='first_name fields'>
          <label htmlFor='RegistrationForm__firstname'>
            First name <Required />
          </label>
          <br />
          <Input
            name='first_name'
            type='text'
            required
            id='RegistrationForm__firstname'>
          </Input>
        </div>
        <div className='last_name fields'>
          <label htmlFor='RegistrationForm__lastname'>
            Last name <Required />
          </label>
          <br />
          <Input
            name='last_name'
            type='text'
            required
            id='RegistrationForm__lastname'>
          </Input>
        </div>
        <div className='username fields'>
          <label htmlFor='RegistrationForm__username'>
            Username <Required />
          </label>
          <Input
            name='username'
            type='text'
            required
            id='RegistrationForm__username'
            className='input'>
          </Input>
        </div>
        <div className='password fields'>
          <label htmlFor='RegistrationForm__password'>
            Password <Required />
          </label>
          <Input
            name='password'
            type='password'
            required
            id='RegistrationForm__password'>
          </Input>
        </div>
        <button type='submit' className='butts'>
          Register
        </button>
        <br />
        <a className='input' href='/login'>Already have an account?</a>
      </form>
      </div>
    )
  }
}
