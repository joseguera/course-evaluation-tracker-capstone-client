import React from 'react';
import ReactDOM from 'react-dom';
import AddCourse from './AddCourse';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<AddCourse />, div);

  ReactDOM.unmountComponentAtNode(div);
});