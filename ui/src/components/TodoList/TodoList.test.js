import React from 'react';
import { render, screen } from '@testing-library/react';
import todos from './todos';

const { todos } = JSON.parse(JSON.stringify(require('../../test/dummyData/todos')));

it('should render todos correctly', () => {
  render(<todos todos={todos} />);
  
  const element = screen.getByTestId('todos-todoItem-1');
  expect(element).toBeInTheDocument();

})