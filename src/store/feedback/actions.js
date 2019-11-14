import * as actionTypes from './actionTypes'

export const resetMessage = () => {
  return {
    type: actionTypes.SET_FEEDBACK_MESSAGE.reset()
  }
}

export const setFeedbackMessage = (type, content, duration) => {
  return {
    type: actionTypes.SET_FEEDBACK_MESSAGE.success(),
    payload: { type, content, duration }
  }
}
