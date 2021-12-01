import React from 'react';
import { render, screen } from '@testing-library/react';
import todoItem from './todoItem';

const { todos } = JSON.parse(JSON.stringify(require('../../dummyData/todos')));

it('renders correctly', () => {
  render(<todoItem location={{ todoItem: todos[0] }} />);

  const element = screen.getByTestId('todoItem');
  expect(element).toBeInTheDocument();
})