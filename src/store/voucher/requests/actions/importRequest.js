import * as types from '../actionTypes'
import axios from 'axios-settings'
import EventEmitter from '../../../../shared/EventEmitter'
import { setFeedbackMessage } from '../../../feedback/actions'
import { EVENT_IMPORT_REQUEST, EVENT_MASS_UPDATE_SUBMISSION } from '../../../../components/Voucher/Request/contants'
import { API_BAD_REQUEST, API_SUCCESS, API_VALIDATION_ERROR } from '../../../../shared/constants'
import { parseBadRequestErrors } from '../../../../components/Voucher/Request/helpers'
import { massUpdateSbm, initListSubmission } from '../../submissions/actions/getList'

export const resetImportRequest = () => {
  return {
    type: types.IMPORT_REQUEST.reset(),
  }
}

const success = (code) => {
  return {
    type: types.IMPORT_REQUEST.success(),
    payload: { code },
  }
}

const fail = (error, code) => {
  return {
    type: types.IMPORT_REQUEST.fail(),
    payload: {
      error,
      code,
    },
  }
}

const start = () => {
  return {
    type: types.IMPORT_REQUEST.start(),
  }
}

export const importRequest = (params) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'post',
      url: `/api/vouchers/requests/import/`,
      data: params,
    }).then(res => {
      const { code, msg, data } = res.data
      if (code === API_SUCCESS) {
        dispatch(success(code))
        dispatch(initListSubmission(data))
        EventEmitter.dispatch(EVENT_IMPORT_REQUEST, { submissions: data })
        dispatch(setFeedbackMessage('success', 'Import success!'))
      } else if (code === API_VALIDATION_ERROR) {
        const errors = data['_']
        if (typeof errors === 'string') {
          dispatch(setFeedbackMessage('error', errors))
        }
        dispatch(fail(errors, code))
      } else if (code === API_BAD_REQUEST) {
        const message = parseBadRequestErrors(data)
        dispatch(setFeedbackMessage('error', message))
        dispatch(fail(message, code))
      } else {
        dispatch(fail(msg, code))
        dispatch(setFeedbackMessage('error', msg))
      }
    }).catch(err => {
      dispatch(fail(err.toString()))
      dispatch(setFeedbackMessage('error', err.toString()))
    })
  }
}
