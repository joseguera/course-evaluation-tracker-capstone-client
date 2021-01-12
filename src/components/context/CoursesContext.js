import React from 'react'

const CoursesContext = React.createContext({
  noms: [],
  addCourse: () => {},
  deleteCourse: () => {},
  updateCourse: () => {},
})

export default CoursesContext;