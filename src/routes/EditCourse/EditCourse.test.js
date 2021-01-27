import React from 'react';
import ReactDOM from 'react-dom';
import EditCourse from './EditCourse';

const props = { match: { params: { courseId: 1 } }, history: { push: () => {} } }

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<EditCourse {...props} />, div);

  ReactDOM.unmountComponentAtNode(div);
});