import * as types from '../actionTypes'
import axios from 'axios-settings'
import { setFeedbackMessage } from 'src/store/feedback/actions'
import EventEmitter from '../../../../shared/EventEmitter'
import { EVENT_ADD_SUBMISSION } from '../../../../components/Voucher/Request/contants'
import { API_BAD_REQUEST, API_SUCCESS, API_VALIDATION_ERROR } from '../../../../shared/constants'
import {
  fromUploadExcelErrorObjToString, parseBadRequestErrors, parseUpdateSubmissionValidationError,
  parseUploadApiValidationErrors
} from '../../../../components/Voucher/Request/helpers'

export const resetSubmissionDetail = () => {
  return {
    type: types.SUBMISSION_DETAIL.reset()
  }
}

export const resetSubmissionCreateUpdateDeleteState = () => {
  return {
    type: types.SUBMISSION_DETAIL.success(),
    payload: { created: false, updated: false, deleted: false }
  }
}

const success = (payload) => {
  return {
    type: types.SUBMISSION_DETAIL.success(),
    payload,
  }
}

const fail = (error, code) => {
  return {
    type: types.SUBMISSION_DETAIL.fail(),
    payload: { error, code }
  }
}

const start = () => {
  return {
    type: types.SUBMISSION_DETAIL.start()
  }
}

const addToList = (payload) => {
  return {
    type: types.GET_LIST_SUBMISSION.custom('addToList'),
    payload,
  }
}

const updateItemInList = (payload) => {
  return {
    type: types.GET_LIST_SUBMISSION.custom('updateItemInList'),
    payload,
  }
}

const deleteItemInList = (payload) => {
  return {
    type: types.GET_LIST_SUBMISSION.custom('deleteItemInList'),
    payload,
  }
}

export const getDetailSubmission = (id) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'get',
      url: `/api/vouchers/submissions/${id}/`,
    }).then(res => {
      const code = res.data['code']
      if (code === 0) {
        dispatch(success({ data: res.data['data'], code }))
      } else {
        dispatch(fail(res.data['msg'], code))
      }
    }).catch(err => {
      dispatch(fail(err.toString()))
    })
  }
}

export const createSubmission = (requestData) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'post',
      url: `/api/vouchers/submissions/`,
      data: requestData,
    }).then(res => {
      const code = res.data['code']
      if (code === 0) {
        const submissionData = res.data['data']
        dispatch(success({
          data: submissionData,
          created: true,
          code,
        }))
        dispatch(addToList({ submission: submissionData }))

        EventEmitter.dispatch(EVENT_ADD_SUBMISSION, { data: submissionData, rowIndex: requestData.rowIndex })
        dispatch(setFeedbackMessage('success', 'Submission has been created!'))
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

export const updateSubmission = (id, requestData) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'patch',
      url: `/api/vouchers/submissions/${id}/`,
      data: requestData,
    }).then(res => {
      const { code, msg, data } = res.data
      if (code === API_SUCCESS) {
        const submissionData = data
        dispatch(success({
          data: submissionData,
          updated: true,
          code,
        }))
        dispatch(updateItemInList({ submission: submissionData }))

        EventEmitter.dispatch('update_submission', { data: submissionData, rowIndex: requestData.rowIndex })
        dispatch(setFeedbackMessage('success', 'Submission has been updated!'))
      } else if (code === API_VALIDATION_ERROR) {
        const errorStr = parseUpdateSubmissionValidationError(data, msg)
        dispatch(fail(errorStr, code))
        dispatch(setFeedbackMessage('error', errorStr))
      } else if (code === API_BAD_REQUEST) {
        const errorParsed = parseBadRequestErrors(data)
        dispatch(fail(errorParsed, code))
        dispatch(setFeedbackMessage('error', errorParsed))
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

export const deleteSubmission = (id) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'delete',
      url: `/api/vouchers/submissions/${id}/`,
    }).then(res => {
      const code = res.data['code']
      if (code === 0) {
        dispatch(success({
          data: null,
          deleted: true,
          code,
        }))
        dispatch(deleteItemInList({ id }))

        dispatch(setFeedbackMessage('success', 'Submission has been deleted!'))
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
