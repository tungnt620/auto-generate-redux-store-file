import * as actionTypes from '../actionTypes'
import axios from 'axios-settings'
import { setFeedbackMessage } from 'src/store/feedback/actions'

const success = () => {
  return {
    type: actionTypes.USER_REPORT.success(),
  }
}

const fail = (error) => {
  return {
    type: actionTypes.USER_REPORT.fail(),
    payload: { error }
  }
}

const start = () => {
  return {
    type: actionTypes.USER_REPORT.start()
  }
}

export const resetReport = () => {
  return {
    type: actionTypes.USER_REPORT.start()
  }
}

export const report = (title, content) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'post',
      url: `/api/user/report/`,
      data: {
        title, content
      }
    }).then(res => {
      if (res.data['code'] === 0) {
        dispatch(success())
        dispatch(setFeedbackMessage('success', 'Your message has submitted'))
      } else {
        const msg = res.data['msg']
        dispatch(fail(msg))
        dispatch(setFeedbackMessage('error', msg))
      }
    }).catch(err => {
      dispatch(fail(err.toString()))
      dispatch(setFeedbackMessage('error', err.toString()))
    })
  }
}
