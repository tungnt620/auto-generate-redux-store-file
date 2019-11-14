import * as actionTypes from '../actionTypes'

export const initialState = {
  token: null,
  isRequiredUserConfirmInfo: false,
  error: null
}

const success = (state, payload) => {
  return {
    ...state,
    token: payload.token,
    isRequiredUserConfirmInfo: payload.isRequiredUserConfirmInfo,
  }
}

const fail = (state, payload) => {
  return {
    ...state,
    ...payload,
  }
}

export const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.AUTH.success():
      return success(state, payload)
    case actionTypes.AUTH.fail():
      return fail(state, payload)
    default:
      return state
  }
}
