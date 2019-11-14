import * as actionTypes from '../actionTypes'

export const initialState = {
  success: false,
  loading: false,
  error: null
}

const start = (state) => {
  return {
    ...state,
    loading: true,
  }
}

const success = (state) => {
  return {
    ...state,
    success: true,
    loading: false,
  }
}

const fail = (state, payload) => {
  return {
    ...state,
    error: payload.error,
    loading: false,
  }
}

const reset = () => {
  return initialState
}

export const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.USER_REPORT.start():
      return start(state)
    case actionTypes.USER_REPORT.success():
      return success(state)
    case actionTypes.USER_REPORT.fail():
      return fail(state, payload)
    case actionTypes.USER_REPORT.reset():
      return reset()
    default:
      return state
  }
}
