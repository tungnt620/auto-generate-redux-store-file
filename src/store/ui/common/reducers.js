import * as actionTypes from './actionTypes'

export const initialState = {
  forceRerenderApp: false,
  breadcrumbs: [],
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

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.UPDATE_UI_CONFIG.success():
      return success(state, payload)
    case actionTypes.UPDATE_UI_CONFIG.reset():
      return reset()
    default:
      return state
  }
}
