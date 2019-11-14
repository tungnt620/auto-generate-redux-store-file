import * as types from '../types'

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

export const reducer = (state, action) => {
  const {type, payload} = action
  switch (type) {
    case types.CREATE_TEMPLATE.start():
      return start(state)
    case types.CREATE_TEMPLATE.success():
      return success(state, payload)
    case types.CREATE_TEMPLATE.fail():
      return fail(state, payload)
    case types.CREATE_TEMPLATE.reset():
      return reset()
    default:
      return state
  }
}