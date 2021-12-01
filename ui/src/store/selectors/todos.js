import { createSelector } from 'reselect';

const domain = (state) => state;

export const selectTodos = () => createSelector(
  domain,
  (substate) => substate.todos.data,
);