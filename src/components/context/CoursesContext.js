import React from 'react'

const CoursesContext = React.createContext({
  courses: [],
  addCourse: () => {},
  deleteCourse: () => {},
  updateCourse: () => {},
})

export default CoursesContext;