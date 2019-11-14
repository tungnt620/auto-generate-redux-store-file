import * as types from '../actionTypes'
import axios from 'axios-settings'
import { API_INVALID_ACTION, API_SUCCESS } from '../../../../shared/constants'
import { setFeedbackMessage } from '../../../feedback/actions'
import { parseInvalidActionsErrors } from '../../../../components/Voucher/Request/helpers'

export const resetMassPromotionCheck = () => {
  return {
    type: types.SUBMISSION_MASS_PROMOTION_CHECK.reset()
  }
}

const success = (data, code) => {
  return {
    type: types.SUBMISSION_MASS_PROMOTION_CHECK.success(),
    payload: { data, code }
  }
}

const fail = (error, code) => {
  return {
    type: types.SUBMISSION_MASS_PROMOTION_CHECK.fail(),
    payload: { error, code }
  }
}

const start = () => {
  return {
    type: types.SUBMISSION_MASS_PROMOTION_CHECK.start()
  }
}

export const massPromotionCheck = (submission_ids) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'post',
      url: `/api/vouchers/mass_promotion_check/`,
      data: { submission_ids },
    }).then(res => {
      const { code, data, msg } = res.data
      if (code === API_SUCCESS) {
        dispatch(success(data, code))
      } else if (code === API_INVALID_ACTION) {
        const errorStr = parseInvalidActionsErrors(data)
        dispatch(fail(errorStr, code))
        dispatch(setFeedbackMessage('error', errorStr))
      } else {
        dispatch(fail(msg, code))
        dispatch(setFeedbackMessage('error', msg))
      }
    }).catch(err => {
      dispatch(fail(err.toString()))
    })
  }
}
