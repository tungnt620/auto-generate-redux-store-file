import * as types from '../actionTypes'
import axios from 'axios-settings'

export const resetGetListRequest = () => {
  return {
    type: types.GET_LIST_REQUEST.reset(),
  }
}

const success = (data, pagination, code) => {
  return {
    type: types.GET_LIST_REQUEST.success(),
    payload: {
      data,
      pagination,
      code,
    },
  }
}

const fail = (error, code) => {
  return {
    type: types.GET_LIST_REQUEST.fail(),
    payload: {
      error,
      code,
    },
  }
}

const start = () => {
  return {
    type: types.GET_LIST_REQUEST.start(),
  }
}

export const getListRequest = (params) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'get',
      url: `/api/vouchers/requests/`,
      params: params,
    }).then(res => {
      const code = res.data['code']
      if (code === 0) {
        const { records, paging } = res.data['data']
        dispatch(success(records, paging, code))
      } else {
        dispatch(fail(res.data['msg'], code))
      }
    }).catch(err => {
      dispatch(fail(err.toString()))
    })
  }
}
