import * as types from '../actionTypes'

export const initial = {
  loading: false,
  data: {},
  created: false,
  updated: false,
  deleted: false,
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
    ...payload,
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
    case types.CAMPAIGN_DETAIL.start():
      return start(state)
    case types.CAMPAIGN_DETAIL.success():
      return success(state, payload)
    case types.CAMPAIGN_DETAIL.fail():
      return fail(state, payload)
    case types.CAMPAIGN_DETAIL.reset():
      return reset()
    default:
      return state
  }
}
