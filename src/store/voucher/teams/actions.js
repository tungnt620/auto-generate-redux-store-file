import * as actionTypes from './actionTypes'
import axios from 'axios-settings'

const getListSuccess = (data, code) => {
  return {
    type: actionTypes.GET_LIST_VOUCHER_TEAM.success(),
    payload: {
      data,
      code,
    },
  }
}

const getListFail = (error, code) => {
  return {
    type: actionTypes.GET_LIST_VOUCHER_TEAM.fail(),
    payload: {
      error,
      code,
    },
  }
}

const getListStart = () => {
  return {
    type: actionTypes.GET_LIST_VOUCHER_TEAM.start(),
  }
}

export const resetGetListVoucherTeams = () => {
  return {
    type: actionTypes.GET_LIST_VOUCHER_TEAM.reset(),
  }
}

export const getListVoucherTeams = (params) => {
  return dispatch => {
    dispatch(getListStart())
    axios({
      method: 'get',
      url: `/api/vouchers/teams/`,
      params: params,
    }).then(res => {
      const { code, msg, data } = res.data
      if (code === 0) {
        dispatch(getListSuccess(data, code))
      } else {
        dispatch(getListFail(msg, code))
      }
    }).catch(err => {
      dispatch(getListFail(err.toString()))
    })
  }
}
