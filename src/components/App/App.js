import React, { Component } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Header from '../Header/Header'
import TokenService from '../../services/token-service'
import Navigation from '../../components/Navigation/Navigation'
import Home from '../../routes/Home/Home'
import CourseList from '../../routes/CourseList/CourseList'
import CoursePage from '../../routes/CoursePage/CoursePage'
import AddCourse from '../../routes/AddCourse/AddCourse'
import EditCourse from '../../routes/EditCourse/EditCourse'
import LoginPage from '../../routes/LoginPage/LoginPage'
import RegistrationPage from '../../routes/RegistrationPage/ResgistrationPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import CoursesContext from '../../components/context/CoursesContext'
import config from '../../config'

class App extends Component {
  state = {
    courses: [],
    error: null
  }

  componentDidMount() {
    document.body.style.backgroundColor = "#FAFAFA"
    fetch(config.API_ENDPOINT + `/courses/`, {
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
      .then(this.setCourses)
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  setCourses = courses => {
    this.setState({
      courses,
      error: null
    })
  }

  addCourse = course => {
    this.setState({
      courses: [...this.state.courses, course]
    })
  }

  deleteCourse = courseId => {
    const newCourses = this.state.courses.filter(course =>
      course.id !== courseId  
    )
    this.setState({
      courses: newCourses
    })
  }

  updateCourse = updatedCourse => {
    this.setState({
      courses: this.state.courses.map(course =>
        (course.id !== updatedCourse.id) ? course : updatedCourse
      )
    })
  }

  render() {
    const contextValue = {
      courses: this.state.courses,
      addCourse: this.addCourse,
      deleteCourse: this.deleteCourse,
      updateCourse: this.updateCourse,
    }
    return (
      <div 
        className='App'>
        <header className='App__header'>
            <Header />
        </header>
        <main className='app-main'>
          <CoursesContext.Provider value={contextValue}>
              <Navigation />
              <BrowserRouter>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route path={'/login'} component={LoginPage} />
                  <Route path={'/register'} component={RegistrationPage} />
                  <Route path={'/courselist'} component={CourseList} />
                  <Route path={'/course-page/:courseId'} component={CoursePage} />
                  <Route path={'/new-course'} component={AddCourse} />
                  <Route path={'/edit-course/:courseId'} component={EditCourse} />
                  <Route component={NotFoundPage} />
                </Switch>
              </BrowserRouter>
          </CoursesContext.Provider>
        </main>
      </div>
    )
  }
}

export default App;