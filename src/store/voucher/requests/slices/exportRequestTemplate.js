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
    case types.EXPORT_REQUEST_TEMPLATE.start():
      return start(state)
    case types.EXPORT_REQUEST_TEMPLATE.success():
      return success(state, payload)
    case types.EXPORT_REQUEST_TEMPLATE.fail():
      return fail(state, payload)
    case types.EXPORT_REQUEST_TEMPLATE.reset():
      return reset()
    default:
      return state
  }
}
