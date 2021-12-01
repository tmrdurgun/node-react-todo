import { all } from 'redux-saga/effects';

import {
  getTodosWatcher,
} from './todos';

export default function* rootSaga() {
  yield all([
    getTodosWatcher(),
  ]);
}
