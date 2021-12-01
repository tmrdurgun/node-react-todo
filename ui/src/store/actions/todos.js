import * as constants from '../constants';

export const getTodos = (data) => ({ type: constants.GET_TODOS, data });
export const settodos = (data) => ({ type: constants.SET_TODOS, data });