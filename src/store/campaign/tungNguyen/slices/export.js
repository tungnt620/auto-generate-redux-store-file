import * as types from '../actionTypes'

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
  const { type, payload } = action
  switch (type) {
    case types.CAMPAIGN_EXPORT.start():
      return start(state)
    case types.CAMPAIGN_EXPORT.success():
      return success(state, payload)
    case types.CAMPAIGN_EXPORT.fail():
      return fail(state, payload)
    case types.CAMPAIGN_EXPORT.reset():
      return reset()
    default:
      return state
  }
}
