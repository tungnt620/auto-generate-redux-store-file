import * as types from '../actionTypes'

export const initial = {
  loading: false,
  error: null,
  code: null,
  data:{},
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
    loading: false
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
    case types.GET_DATA_DASHBOARD.start():
      return start(state)
    case types.GET_DATA_DASHBOARD.success():
      return success(state, payload)
    case types.GET_DATA_DASHBOARD.fail():
      return fail(state, payload)
    case types.GET_DATA_DASHBOARD.reset():
      return reset()
    default:
      return state
  }
}
