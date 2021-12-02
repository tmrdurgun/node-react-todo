import { all } from 'redux-saga/effects';

import {
  getTodosWatcher,
  createTodoWatcher
} from './todos';

export default function* rootSaga() {
  yield all([
    getTodosWatcher(),
    createTodoWatcher()
  ]);
}
