import { call, put, select } from 'redux-saga/effects';
import api from '../../services/api';

import { Creators as UserActions } from '../ducks/users';

export function* addUser(action) {
  try {
    const { data } = yield call(api.get, `/users/${action.payload.newUser.repository}`);

    const isDuplicated = yield select(state => state.users.data.find(user => user.id === data.id));

    if (isDuplicated) {
      yield put(UserActions.addUserFailure('Usuário duplicado'));
    } else {
      const repositoryData = {
        id: data.id,
        name: data.name,
        login: data.login,
        url: data.html_url,
        avatar_url: data.avatar_url,
        latitude: action.payload.newUser.latitude,
        longitude: action.payload.newUser.longitude,
      };

      yield put(UserActions.addUserSuccess(repositoryData));
    }
  } catch (error) {
    yield put(UserActions.addUserFailure('Usuário não encontrado'));
  }
}

export function* removeUser(action) {
  try {
    const newData = yield select(state => state.users.data.filter(user => user.id !== action.payload.id));

    yield put(UserActions.removeUserSuccess(newData));
  } catch (error) {
    yield put(UserActions.removeUserFailure('Erro ao remover usuário'));
  }
}
