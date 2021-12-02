import {
    call,
    take,
    all,
    put,
} from 'redux-saga/effects';

import { request } from '../../utils/request';

import * as constants from '../constants';

import * as todoItemActions from '../actions/todos';

/* LIST */
function* getTodos() {
    const result = yield call(request, "http://localhost:3002/todo/list", 'GET');

    console.log('result: ', result);

    try {
        if (result.success) {
            yield put(todoItemActions.setTodos(result.data));
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log(error.message);
    }

}

export function* getTodosWatcher() {
    while (true) {
        const action = yield take(constants.GET_TODOS);
        yield call(getTodos, action);
    }
}

/* CREATE */
function* createTodo(todo) {
    const result = yield call(request, "http://localhost:3002/todo/create", 'POST', JSON.stringify(todo));

    try {
        if (result.success) {
            yield put(todoItemActions.getTodos());
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log(error.message);
    }

}

export function* createTodoWatcher() {
    while (true) {
        const action = yield take(constants.CREATE_TODO);
        yield call(createTodo, action.data);
    }
}

/* EDIT */
function* editTodo(todo) {
    const result = yield call(request, "http://localhost:3002/todo/edit", 'POST', JSON.stringify(todo));

    try {
        if (result.success) {
            yield put(todoItemActions.getTodos());
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log(error.message);
    }

}

export function* editTodoWatcher() {
    while (true) {
        const action = yield take(constants.EDIT_TODO);
        yield call(editTodo, action.data);
    }
}

/* REMOVE */
function* removeTodo(todo) {
    const result = yield call(request, "http://localhost:3002/todo/remove", 'POST', JSON.stringify(todo));

    try {
        if (result.success) {
            yield put(todoItemActions.getTodos());
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log(error.message);
    }

}

export function* removeTodoWatcher() {
    while (true) {
        const action = yield take(constants.REMOVE_TODO);
        yield call(removeTodo, action.data);
    }
}