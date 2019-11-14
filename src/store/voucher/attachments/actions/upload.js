import * as types from '../actionTypes'
import axios from 'axios-settings'
import EventEmitter from '../../../../shared/EventEmitter'
import { setFeedbackMessage } from '../../../feedback/actions'
import { API_BAD_REQUEST, API_SUCCESS, API_VALIDATION_ERROR } from '../../../../shared/constants'
import { EVENT_MASS_UPDATE_SUBMISSION } from '../../../../components/Voucher/Request/contants'
import { parseBadRequestErrors } from '../../../../components/Voucher/Request/helpers'

export const resetUploadAttachmentFile = () => {
  return {
    type: types.UPLOAD_SUBMISSION_ATTACHMENT_FILE.reset()
  }
}

const success = (data, code) => {
  return {
    type: types.UPLOAD_SUBMISSION_ATTACHMENT_FILE.success(),
    payload: { data, code }
  }
}

const fail = (error, code) => {
  return {
    type: types.UPLOAD_SUBMISSION_ATTACHMENT_FILE.fail(),
    payload: { error, code }
  }
}

const start = () => {
  return {
    type: types.UPLOAD_SUBMISSION_ATTACHMENT_FILE.start()
  }
}

export const uploadAttachmentFile = (params) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'post',
      url: `/api/vouchers/attachments/import/`,
      data: params,
    }).then(res => {
      const code = res.data['code']
      const submissionsData = res.data['data']
      if (code === API_SUCCESS) {
        dispatch(success(submissionsData, code))
        EventEmitter.dispatch(EVENT_MASS_UPDATE_SUBMISSION, { submissions: submissionsData })
        dispatch(setFeedbackMessage('success', 'Upload attachment success!'))
      } else if (code === API_VALIDATION_ERROR) {
        const errors = res.data['data']['_']
        if (typeof errors === 'string') {
          dispatch(setFeedbackMessage('error', errors))
        }
        dispatch(fail(errors, code))
      } else if (code === API_BAD_REQUEST) {
        const message = parseBadRequestErrors(res.data['data'])
        dispatch(setFeedbackMessage('error', message))
        dispatch(fail(message, code))
      } else {
        const message = res.data['msg']
        dispatch(fail(message, code))
        dispatch(setFeedbackMessage('error', message))
      }
    }).catch(err => {
      dispatch(fail(err.toString()))
      dispatch(setFeedbackMessage('error', err.toString()))
    })
  }
}
