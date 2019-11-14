import * as actionTypes from '../actionTypes'

export const initialState = {
  data: {},
  loading: false,
  error: null,
  updated: false,
}

const start = (state) => {
  return {
    ...state,
    loading: true,
  }
}

const success = (state, payload) => {
  return {
    ...state,
    ...payload,
    loading: false,
  }
}

const fail = (state, payload) => {
  return {
    ...state,
    error: payload.error,
    loading: false,
  }
}

export const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.GET_USER_INFO.start():
      return start(state)
    case actionTypes.GET_USER_INFO.success():
      return success(state, payload)
    case actionTypes.GET_USER_INFO.fail():
      return fail(state, payload)
    default:
      return state
  }
}
