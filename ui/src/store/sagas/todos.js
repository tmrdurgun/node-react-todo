import {
    call,
    take,
    all,
    put,
} from 'redux-saga/effects';

import { request } from '../../utils/request';

import * as constants from '../constants';

import * as todoItemActions from '../actions/todos';

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
