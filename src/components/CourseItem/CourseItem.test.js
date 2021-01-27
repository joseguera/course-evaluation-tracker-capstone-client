import React from 'react';
import ReactDOM from 'react-dom';
import CourseItem from './CourseItem';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<CourseItem />, div);

  ReactDOM.unmountComponentAtNode(div);
});