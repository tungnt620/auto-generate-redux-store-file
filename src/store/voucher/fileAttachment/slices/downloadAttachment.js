import * as types from '../types'

export const initial = {
  loading: false,
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
    case types.DOWNLOAD_ATTACHMENT.start():
      return start(state)
    case types.DOWNLOAD_ATTACHMENT.success():
      return success(state, payload)
    case types.DOWNLOAD_ATTACHMENT.fail():
      return fail(state, payload)
    case types.DOWNLOAD_ATTACHMENT.reset():
      return reset()
    default:
      return state
  }
}