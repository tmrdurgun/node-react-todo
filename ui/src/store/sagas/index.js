import { all } from 'redux-saga/effects';

import {
  getTodosWatcher,
  createTodoWatcher,
  editTodoWatcher,
  removeTodoWatcher
} from './todos';

export default function* rootSaga() {
  yield all([
    getTodosWatcher(),
    createTodoWatcher(),
    editTodoWatcher(),
    removeTodoWatcher()
  ]);
}
