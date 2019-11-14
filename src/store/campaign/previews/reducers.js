import * as types from './types'

export const initial = {
  loading: false,
  message: '',
  error: null
}

const start = (state) => {
  return {
    ...state,
    loading: true
  }
}

const success = (state, payload) => {
  return {
    ...state,
    message: payload.message,
    loading: false
  }
}

const fail = (state, payload) => {
  return {
    ...state,
    error: payload.error,
    loading: false
  }
}

const reset = () => {
  return initial
}

const reducer = (state = initial, action) => {
  const { type, payload } = action
  switch (type) {
    case types.EXPORT_PREVIEW.start():
      return start(state)
    case types.EXPORT_PREVIEW.success():
      return success(state, payload)
    case types.EXPORT_PREVIEW.fail():
      return fail(state, payload)
    case types.EXPORT_PREVIEW.reset():
      return reset()
    default:
      return state
  }
}

export default reducer