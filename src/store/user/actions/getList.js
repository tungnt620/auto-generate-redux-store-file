import * as types from '../actionTypes'
import axios from 'axios-settings'

export const resetGetListUser = () => {
  return {
    type: types.GET_LIST_USER.reset()
  }
}

const success = (data) => {
  return {
    type: types.GET_LIST_USER.success(),
    payload: { data }
  }
}

const fail = (error) => {
  return {
    type: types.GET_LIST_USER.fail(),
    payload: { error }
  }
}

const start = () => {
  return {
    type: types.GET_LIST_USER.start()
  }
}

export const getListUsers = (params) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'get',
      url: `/api/users/`,
      params: params
    }).then(res => {
      if (res.data['code'] === 0) {
        dispatch(success(res.data['data']))
      } else {
        dispatch(fail(res.data['msg']))
      }
    }).catch(err => {
      dispatch(fail(err.toString()))
    })
  }
}
