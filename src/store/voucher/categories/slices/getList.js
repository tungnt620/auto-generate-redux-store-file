import * as actionTypes from '../actionTypes'

export const initialState = {
  data: [],
  loading: false,
  code: null,
  error: null,
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
    code: payload.code,
    loading: false,
  }
}

const fail = (state, payload) => {
  return {
    ...state,
    code: payload.code,
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
    case actionTypes.GET_LIST_VOUCHER_CATEGORY.start():
      return start(state)
    case actionTypes.GET_LIST_VOUCHER_CATEGORY.success():
      return success(state, payload)
    case actionTypes.GET_LIST_VOUCHER_CATEGORY.fail():
      return fail(state, payload)
    case actionTypes.GET_LIST_VOUCHER_CATEGORY.reset():
      return reset()
    default:
      return state
  }
}
