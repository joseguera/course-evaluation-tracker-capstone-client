import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from '../Header/Header'
import TokenService from '../../services/token-service'
import Navigation from '../../components/Navigation/Navigation'
import Home from '../../routes/Home/Home'
import NomList from '../../routes/NomList/NomList'
import NomPage from '../../routes/NomPage/NomPage'
import AddNom from '../../routes/AddNom/AddNom'
import EditNom from '../../routes/EditNom/EditNom'
import LoginPage from '../../routes/LoginPage/LoginPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import NomNomsContext from '../../context/NomNomsContext'
import config from '../../config'

class App extends Component {
  state = {
    noms: [],
    error: null
  }

  componentDidMount() {
    document.body.style.backgroundColor = "skyblue"
    fetch(config.API_ENDPOINT + `/noms/`, {
      method: 'GET',
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
      .then(this.setNoms)
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  setNoms = noms => {
    this.setState({
      noms,
      error: null
    })
  }

  addNom = nom => {
    this.setState({
      noms: [...this.state.noms, nom]
    })
  }

  deleteNom = nomId => {
    const newNoms = this.state.noms.filter(nom =>
      nom.id !== nomId  
    )
    this.setState({
      noms: newNoms
    })
  }

  updateNom = updatedNom => {
    this.setState({
      noms: this.state.noms.map(nom =>
        (nom.id !== updatedNom.id) ? nom : updatedNom
      )
    })
  }

  render() {
    const contextValue = {
      noms: this.state.noms,
      addNom: this.addNom,
      deleteNom: this.deleteNom,
      updateNom: this.updateNom,
    }
    return (
      <div 
        className='App'>
        <header className='App__header'>
            <Header />
        </header>
        <main className='app-main'>
          <NomNomsContext.Provider value={contextValue}>
            <Navigation />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path={'/login'} component={LoginPage} />
              <Route path={'/register'} component={RegistrationPage} />
              <Route path={'/nomlist'} component={NomList} />
              <Route path={'/nom-page/:nomId'} component={NomPage} />
              <Route path={'/new-nom'} component={AddNom} />
              <Route path={'/edit-nom/:nomId'} component={EditNom} />
              <Route component={NotFoundPage} />
            </Switch>
          </NomNomsContext.Provider>
        </main>
      </div>
    )
  }
}

export default App;