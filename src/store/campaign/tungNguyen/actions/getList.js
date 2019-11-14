import * as types from '../actionTypes'
import axios from 'axios-settings'

export const resetGetListTungNguyen = () => {
  return {
    type: types.GET_LIST_TUNG NGUYEN.reset()
  }
}

const success = (data, pagination) => {
  return {
    type: types.GET_LIST_TUNG NGUYEN.success(),
    payload: { data, pagination }
  }
}

const fail = (error) => {
  return {
    type: types.GET_LIST_TUNG NGUYEN.fail(),
    payload: { error }
  }
}

const start = () => {
  return {
    type: types.GET_LIST_TUNG NGUYEN.start()
  }
}

export const getListTungNguyen = (params) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'get',
      url: `/api/tungNguyen/`,
      params: params,
    }).then(res => {
      if (res.data['code'] === 0) {
        const {records, paging} = res.data['data']
        dispatch(success(records, paging))
      } else {
        dispatch(fail(res.data['msg']))
      }
    }).catch(err => {
      dispatch(fail(err.toString()))
    })
  }
}
