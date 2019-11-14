import * as types from '../types'

export const initial = {
  loading: false,
  code: null,
  data: null,
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
    code: payload.code,
    data: payload.data,
    loading: false,
  }
}

const fail = (state, payload) => {
  return {
    ...state,
    error: payload.error,
    code: payload.code,
    loading: false,
  }
}

const reset = () => {
  return initial
}

export const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case types.CREATE_REQUEST_COMMENT.start():
      return start(state)
    case types.CREATE_REQUEST_COMMENT.success():
      return success(state, payload)
    case types.CREATE_REQUEST_COMMENT.fail():
      return fail(state, payload)
    case types.CREATE_REQUEST_COMMENT.reset():
      return reset()
    default:
      return state
  }
}