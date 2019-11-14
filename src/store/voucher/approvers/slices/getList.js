import * as types from '../actionTypes'

export const initial = {
  loading: false,
  data: [],
  error: null,
  code: null,
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
    case types.GET_LIST_APPROVER.start():
      return start(state)
    case types.GET_LIST_APPROVER.success():
      return success(state, payload)
    case types.GET_LIST_APPROVER.fail():
      return fail(state, payload)
    case types.GET_LIST_APPROVER.reset():
      return reset()
    default:
      return state
  }
}
