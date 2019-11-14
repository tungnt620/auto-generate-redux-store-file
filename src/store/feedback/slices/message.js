import * as actionTypes from '../actionTypes'

export const initialState = {
  type: 'info',
  content: '',
  duration: 1.5,
}

const success = (state, payload) => {
  return {
    ...state,
    type: payload.type,
    content: payload.content,
    duration: payload.duration,
  }
}

const reset = () => {
  return initialState
}

export const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.SET_FEEDBACK_MESSAGE.success():
      return success(state, payload)
    case actionTypes.SET_FEEDBACK_MESSAGE.reset():
      return reset()
    default:
      return state
  }
}
