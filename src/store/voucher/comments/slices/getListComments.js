import * as types from '../types'

export const initial = {
  loading: false,
  data: null,
  code: null,
  error: null,
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
    data: payload.data,
    loading: false,
    code: payload.code,
  }
}

const fail = (state, payload) => {
  return {
    ...state,
    error: payload.error,
    loading: false,
    code: payload.code,
  }
}

const reset = () => {
  return initial
}

export const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case types.GET_LIST_REQUEST_COMMENTS.start():
      return start(state)
    case types.GET_LIST_REQUEST_COMMENTS.success():
      return success(state, payload)
    case types.GET_LIST_REQUEST_COMMENTS.fail():
      return fail(state, payload)
    case types.GET_LIST_REQUEST_COMMENTS.reset():
      return reset()
    default:
      return state
  }
}