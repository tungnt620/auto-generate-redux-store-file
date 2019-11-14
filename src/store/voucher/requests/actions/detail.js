import * as types from '../actionTypes'
import axios from 'axios-settings'
import { setFeedbackMessage } from 'src/store/feedback/actions'
import { API_ACTION_DENIED, API_SUCCESS } from '../../../../shared/constants'
import { parseActionDeniedErrors } from '../../../../components/Voucher/Request/helpers'
import React from 'react'

export const resetRequestDetail = () => {
  return {
    type: types.REQUEST_DETAIL.reset()
  }
}

export const resetRequestCreateUpdateDeleteState = () => {
  return {
    type: types.REQUEST_DETAIL.success(),
    payload: { created: false, updated: false, deleted: false }
  }
}

const success = (payload) => {
  return {
    type: types.REQUEST_DETAIL.success(),
    payload,
  }
}

const fail = (error, code) => {
  return {
    type: types.REQUEST_DETAIL.fail(),
    payload: { error, code }
  }
}

const start = () => {
  return {
    type: types.REQUEST_DETAIL.start()
  }
}

export const getDetailRequest = (id) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'get',
      url: `/api/vouchers/requests/${id}/`,
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

export const createRequest = (data) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'post',
      url: `/api/vouchers/requests/`,
      data: data,
    }).then(res => {
      const code = res.data['code']
      if (code === 0) {
        dispatch(success({
          data: res.data['data'],
          created: true,
          code,
        }))
        dispatch(setFeedbackMessage('success', 'Request has been created!'))
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

export const updateRequest = (requestID, data) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'patch',
      url: `/api/vouchers/requests/${requestID}/`,
      data: data,
    }).then(res => {
      const { code, data, msg } = res.data
      if (code === API_SUCCESS) {
        dispatch(success({
          data,
          updated: true,
          code,
        }))
        dispatch(setFeedbackMessage('success', 'Request has been updated!'))
      } else if (code === API_ACTION_DENIED) {
        const errorMsg = parseActionDeniedErrors(data)
        dispatch(fail(errorMsg, code))
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

export const deleteVoucherRequest = (requestID) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'delete',
      url: `/api/vouchers/requests/${requestID}/`,
    }).then(res => {
      const code = res.data['code']
      if (code === 0) {
        dispatch(success({
          data: null,
          deleted: true,
          code,
        }))
        dispatch(setFeedbackMessage('success', 'Request has been deleted!'))
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

export const setVoucherRequestState = (payload) => {
  return dispatch => {
    dispatch(success(payload))
  }
}
