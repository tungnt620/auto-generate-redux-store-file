import * as types from '../actionTypes'
import axios from 'axios-settings'
import { setFeedbackMessage } from '../../../feedback/actions'
import { API_SUCCESS } from '../../../../shared/constants'

export const resetGetlistDataDashboard = () => {
  return {
    type: types.GET_DATA_DASHBOARD.reset(),
  }
}

const success = (data, code) => {
  return {
    type: types.GET_DATA_DASHBOARD.success(),
    payload: {
      data,
      code,
    },
  }
}

const fail = (error, code) => {
  return {
    type: types.GET_DATA_DASHBOARD.fail(),
    payload: {
      error,
      code,
    },
  }
}

const start = () => {
  return {
    type: types.GET_DATA_DASHBOARD.start(),
  }
}

export const getListDataDashboard = (params) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'get',
      url: `/api/vouchers/statistics/export/`,
      params: params,
    }).then(res => {
      const { data, code, msg } = res.data
      if (code === API_SUCCESS) {
        dispatch(success(data, code))
      } else {
        dispatch(fail(msg, code))
      }
    }).catch(err => {
      dispatch(fail(err.toString()))
      dispatch(setFeedbackMessage('error', err.toString()))
    })
  }
}
