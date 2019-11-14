import * as types from '../actionTypes'
import axios from 'axios-settings'

export const resetMassUpdateRequest = () => {
  return {
    type: types.MASS_UPDATE_REQUEST.reset(),
  }
}

const success = (code) => {
  return {
    type: types.MASS_UPDATE_REQUEST.success(),
    payload: { code },
  }
}

const fail = (error, code) => {
  return {
    type: types.MASS_UPDATE_REQUEST.fail(),
    payload: {
      error,
      code,
    },
  }
}

const start = () => {
  return {
    type: types.MASS_UPDATE_REQUEST.start(),
  }
}

export const massUpdateRequest = (params) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'patch',
      url: `/api/vouchers/requests/`,
      data: params,
    }).then(res => {
      const { code, msg, data } = res.data
      if (code === 0) {
        dispatch(success(code))
      } else {
        dispatch(fail(data ? data['_'] : msg, code))
      }
    }).catch(err => {
      dispatch(fail(err.toString()))
    })
  }
}
