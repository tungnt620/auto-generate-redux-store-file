import * as types from '../types'

export const initial = {
  loading: false,
  data: null,
  pagination: null,
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
    pagination: payload.pagination,
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
    case types.GET_LIST_TEMPLATES.start():
      return start(state)
    case types.GET_LIST_TEMPLATES.success():
      return success(state, payload)
    case types.GET_LIST_TEMPLATES.fail():
      return fail(state, payload)
    case types.GET_LIST_TEMPLATES.reset():
      return reset()
    default:
      return state
  }
}