import * as types from '../types'

export const initial = {
  loading: false,
  data: null,
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
    data: payload.data,
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
    case types.GET_TEMPLATE_DETAIL.start():
      return start(state)
    case types.GET_TEMPLATE_DETAIL.success():
      return success(state, payload)
    case types.GET_TEMPLATE_DETAIL.fail():
      return fail(state, payload)
    case types.GET_TEMPLATE_DETAIL.reset():
      return reset()
    default:
      return state
  }
}