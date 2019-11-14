import * as types from '../actionTypes'
import axios from 'axios-settings'
import { setFeedbackMessage } from '../../../feedback/actions'
import EventEmitter from '../../../../shared/EventEmitter'
import {
  EVENT_MASS_DELETE_SUBMISSION,
  EVENT_MASS_UPDATE_SUBMISSION
} from '../../../../components/Voucher/Request/contants'
import { API_ACTION_DENIED, API_VALIDATION_ERROR } from '../../../../shared/constants'
import { parseActionDeniedErrors } from '../../../../components/Voucher/Request/helpers'

export const resetGetListVoucherSubmission = () => {
  return {
    type: types.GET_LIST_SUBMISSION.reset()
  }
}

const success = (data, code) => {
  return {
    type: types.GET_LIST_SUBMISSION.success(),
    payload: { data, code }
  }
}

export const initListSubmission = (data) => {
  return {
    type: types.GET_LIST_SUBMISSION.success(),
    payload: { data }
  }
}

const massDeleteSbm = (ids) => {
  return {
    type: types.GET_LIST_SUBMISSION.custom('massDelete'),
    payload: { ids }
  }
}

export const massUpdateSbm = (submissions) => {
  return {
    type: types.GET_LIST_SUBMISSION.custom('massUpdate'),
    payload: { submissions }
  }
}

const fail = (error, code) => {
  return {
    type: types.GET_LIST_SUBMISSION.fail(),
    payload: { error, code }
  }
}

const start = () => {
  return {
    type: types.GET_LIST_SUBMISSION.start()
  }
}

export const getListVoucherSubmission = (params) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'get',
      url: `/api/vouchers/submissions/`,
      params: params,
    }).then(res => {
      const code = res.data['code']
      if (code === 0) {
        dispatch(success(res.data['data'], code))
      } else {
        dispatch(fail(res.data['msg'], code))
      }
    }).catch(err => {
      dispatch(fail(err.toString()))
    })
  }
}

export const massDeleteVoucherSubmission = (ids) => {
  return dispatch => {
    axios({
      method: 'delete',
      url: `/api/vouchers/submissions/`,
      data: {
        ids
      },
    }).then(res => {
      const code = res.data['code']
      if (code === 0) {
        EventEmitter.dispatch(EVENT_MASS_DELETE_SUBMISSION, { ids })
        dispatch(setFeedbackMessage('success', 'Submissions has been deleted!'))
        dispatch(massDeleteSbm(ids))
      } else {
        const message = res.data['msg']
        dispatch(setFeedbackMessage('error', message))
      }
    }).catch(err => {
      dispatch(setFeedbackMessage('error', err.toString()))
    })
  }
}

export const massUpdateVoucherSubmission = (data, successCallback) => {
  return dispatch => {
    axios({
      method: 'patch',
      url: `/api/vouchers/submissions/`,
      data: data,
    }).then(res => {
      const { code, data } = res.data
      if (code === 0) {
        dispatch(setFeedbackMessage('success', 'Submissions has been updated!'))
        dispatch(massUpdateSbm(data))
        EventEmitter.dispatch(EVENT_MASS_UPDATE_SUBMISSION, { submissions: data })
        if (successCallback) successCallback()
      } else if (code === API_VALIDATION_ERROR) {
        const msg = 'Missing of mandatory field. Please fill all highlight fields before confirm'
        dispatch(fail(msg, code))
        dispatch(setFeedbackMessage('error', msg))
      } else if (code === API_ACTION_DENIED) {
        const msg = parseActionDeniedErrors(data)
        dispatch(fail(msg, code))
        dispatch(setFeedbackMessage('error', msg))
      } else {
        const message = res.data['msg']
        dispatch(setFeedbackMessage('error', message))
      }
    }).catch(err => {
      dispatch(setFeedbackMessage('error', err.toString()))
    })
  }
}
