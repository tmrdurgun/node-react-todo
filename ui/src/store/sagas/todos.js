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
    const result = yield call(request, "http://localhost:3002/todos", 'get', true);

    try {
        if (result !== 'invalid') {
            yield put(todoItemActions.settodos(result.data));
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
