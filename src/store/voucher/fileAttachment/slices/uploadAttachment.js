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
    code: payload.code,
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
    case types.UPLOAD_ATTACHMENT.start():
      return start(state)
    case types.UPLOAD_ATTACHMENT.success():
      return success(state, payload)
    case types.UPLOAD_ATTACHMENT.fail():
      return fail(state, payload)
    case types.UPLOAD_ATTACHMENT.reset():
      return reset()
    default:
      return state
  }
}