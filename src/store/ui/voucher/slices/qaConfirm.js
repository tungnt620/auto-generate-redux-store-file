import * as actionTypes from '../actionTypes'

export const initialState = {
  isShowQAConfirmModal: false,
  sbmID: null,
  sbmIDs: null,
  actionType: null,
}

const success = (state, payload) => {
  return {
    ...state,
    ...payload,
  }
}

const reset = () => {
  return initialState
}

export const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.UPDATE_VOUCHER_UI_CONFIG.success():
      return success(state, payload)
    case actionTypes.UPDATE_VOUCHER_UI_CONFIG.reset():
      return reset()
    default:
      return state
  }
}
