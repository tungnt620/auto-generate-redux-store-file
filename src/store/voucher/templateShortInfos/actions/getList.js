import * as types from '../actionTypes'
import axios from 'axios-settings'

export const resetGetListTemplateShortInfo = () => {
  return {
    type: types.GET_LIST_TEMPLATE_SHORT_INFO.reset()
  }
}

const success = (data, code) => {
  return {
    type: types.GET_LIST_TEMPLATE_SHORT_INFO.success(),
    payload: { data, code }
  }
}

const fail = (error, code) => {
  return {
    type: types.GET_LIST_TEMPLATE_SHORT_INFO.fail(),
    payload: { error, code }
  }
}

const start = () => {
  return {
    type: types.GET_LIST_TEMPLATE_SHORT_INFO.start()
  }
}

export const getListTemplateShortInfo = (params) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'get',
      url: `/api/vouchers/templates_short_info/`,
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
