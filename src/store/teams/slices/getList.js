import * as actionTypes from '../actionTypes'

export const initialState = {
  data: {},
  loading: false,
  error: null
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
    case actionTypes.GET_LIST_TEAM.start():
      return start(state)
    case actionTypes.GET_LIST_TEAM.success():
      return success(state, payload)
    case actionTypes.GET_LIST_TEAM.fail():
      return fail(state, payload)
    case actionTypes.GET_LIST_TEAM.reset():
      return reset()
    default:
      return state
  }
}
