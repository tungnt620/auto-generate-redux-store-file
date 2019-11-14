import * as types from '../actionTypes'

export const initial = {
  loading: false,
  error: null,
  code: null,
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
    error: null,
  }
}

const fail = (state, payload) => {
  return {
    ...state,
    ...payload,
    loading: false,
  }
}

const reset = () => {
  return initial
}

export const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case types.IMPORT_REQUEST.start():
      return start(state)
    case types.IMPORT_REQUEST.success():
      return success(state, payload)
    case types.IMPORT_REQUEST.fail():
      return fail(state, payload)
    case types.IMPORT_REQUEST.reset():
      return reset()
    default:
      return state
  }
}
