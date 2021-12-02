import * as constants from '../constants';

export const getTodos = () => ({ type: constants.GET_TODOS });
export const setTodos = (data) => ({ type: constants.SET_TODOS, data });
export const createTodo = (data) => ({ type: constants.CREATE_TODO, data });
export const editTodo = (data) => ({ type: constants.EDIT_TODO, data });
export const removeTodo = (data) => ({ type: constants.REMOVE_TODO, data });