/**
 * Types
 */
export const Types = {
  MODAL_REQUEST: 'users/MODAL_REQUEST',
  MODAL_SUCCESS: 'users/MODAL_SUCCESS',
  ADD_REQUEST: 'users/ADD_REQUEST',
  ADD_SUCCESS: 'users/ADD_SUCCESS',
  ADD_FAILURE: 'users/ADD_FAILURE',
  REMOVE_REQUEST: 'users/REMOVE_REQUEST',
  REMOVE_SUCCESS: 'users/REMOVE_SUCCESS',
  REMOVE_FAILURE: 'users/REMOVE_FAILURE',
};

/**
 * Reducer
 */
const INITIAL_STATE = {
  loading: false,
  data: [],
  success: null,
  error: null,
  newUser: {
    showModal: false,
    repository: '',
    latitude: null,
    longitude: null,
  },
};

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.MODAL_REQUEST:
      if (!action.payload.newUser.showModal) {
        return {
          ...state,
          success: null,
          error: null,
          newUser: {
            showModal: false,
            repository: '',
            latitude: null,
            longitude: null,
          },
        };
      }
      return {
        ...state,
        success: null,
        error: null,
        newUser: action.payload.newUser,
      };
    case Types.ADD_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case Types.ADD_SUCCESS:
      localStorage.setItem(
        '@desafio03:users',
        JSON.stringify([...state.data, action.payload.data]),
      );
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        error: null,
        data: [...state.data, action.payload.data],
      };
    case Types.ADD_FAILURE:
      return {
        ...state,
        loading: false,
        success: null,
        error: action.payload.error,
      };
    case Types.REMOVE_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case Types.REMOVE_SUCCESS:
      localStorage.setItem('@desafio03:users', JSON.stringify(action.payload.data));
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        error: null,
        data: action.payload.data,
      };
    case Types.REMOVE_FAILURE:
      return {
        ...state,
        loading: false,
        success: null,
        error: action.payload.error,
      };
    default:
      if (localStorage.getItem('@desafio03:users')) {
        return {
          ...state,
          data: JSON.parse(localStorage.getItem('@desafio03:users')),
        };
      }
      return state;
  }
}

/**
 * Actions
 */
export const Creators = {
  modalRequest: newUser => ({
    type: Types.MODAL_REQUEST,
    payload: { newUser },
  }),

  addUserRequest: newUser => ({
    type: Types.ADD_REQUEST,
    payload: { newUser },
  }),

  addUserSuccess: data => ({
    type: Types.ADD_SUCCESS,
    payload: { data, success: 'Usuário adicionado com sucesso!' },
  }),

  addUserFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: { error },
  }),

  removeUserRequest: id => ({
    type: Types.REMOVE_REQUEST,
    payload: { id },
  }),

  removeUserSuccess: data => ({
    type: Types.REMOVE_SUCCESS,
    payload: { data, success: 'Usuário removido com sucesso!' },
  }),

  removeUserFailure: error => ({
    type: Types.REMOVE_FAILURE,
    payload: { error },
  }),
};
