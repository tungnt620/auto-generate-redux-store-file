import * as types from '../actionTypes'
import axios from 'axios-settings'

export const resetGetListApprover = () => {
  return {
    type: types.GET_LIST_APPROVER.reset()
  }
}

const success = (data, code) => {
  return {
    type: types.GET_LIST_APPROVER.success(),
    payload: { data, code }
  }
}

const fail = (error, code) => {
  return {
    type: types.GET_LIST_APPROVER.fail(),
    payload: { error, code }
  }
}

const start = () => {
  return {
    type: types.GET_LIST_APPROVER.start()
  }
}

export const getListApprover = (params) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'get',
      url: `/api/vouchers/approvers/`,
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
