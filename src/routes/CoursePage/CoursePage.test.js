import React from 'react';
import ReactDOM from 'react-dom';
import CoursePage from './CoursePage';

const props = { match: { params: { courseId: 1 } }, history: { push: () => {} } }

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<CoursePage {...props} />, div);

  ReactDOM.unmountComponentAtNode(div);
});