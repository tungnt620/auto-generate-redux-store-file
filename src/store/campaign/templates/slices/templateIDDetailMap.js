import * as actionTypes from '../types'

export const initial = {
}

const addTemplateDetail = (state, payload) => {
  return {
    ...state,
    [payload.data.id]: payload.data,
  }
}

const reset = () => {
  return initial
}

export const reducer = (state = initial, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.GET_TEMPLATE_DETAIL.success():
      return addTemplateDetail(state, payload)
    case actionTypes.GET_TEMPLATE_DETAIL.reset():
      return reset()
    default:
      return state
  }
}
