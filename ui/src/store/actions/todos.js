import * as constants from '../constants';

export const getTodos = () => ({ type: constants.GET_TODOS });
export const setTodos = (data) => ({ type: constants.SET_TODOS, data });