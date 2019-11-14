import * as actionTypes from './actionTypes'
import axios from 'axios-settings'

const getListSuccess = (data, code) => {
  return {
    type: actionTypes.GET_LIST_VOUCHER_CATEGORY.success(),
    payload: {
      data,
      code,
    },
  }
}

const getListFail = (error, code) => {
  return {
    type: actionTypes.GET_LIST_VOUCHER_CATEGORY.fail(),
    payload: {
      error,
      code,
    },
  }
}

const getListStart = () => {
  return {
    type: actionTypes.GET_LIST_VOUCHER_CATEGORY.start(),
  }
}

export const resetGetListVoucherCategories = () => {
  return {
    type: actionTypes.GET_LIST_VOUCHER_CATEGORY.reset(),
  }
}

export const getListVoucherCategories = (params) => {
  return dispatch => {
    dispatch(getListStart())
    axios({
      method: 'get',
      url: `/api/vouchers/categories/`,
      params,
    }).then(res => {
      const { data, code, msg } = res.data
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
