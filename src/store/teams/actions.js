import * as actionTypes from './actionTypes'
import axios from 'axios-settings'

const getListSuccess = (data) => {
  return {
    type: actionTypes.GET_LIST_TEAM.success(),
    payload: { data }
  }
}

const getListFail = (error) => {
  return {
    type: actionTypes.GET_LIST_TEAM.fail(),
    payload: { error }
  }
}

const getListStart = () => {
  return {
    type: actionTypes.GET_LIST_TEAM.start()
  }
}

export const resetGetListTeams = () => {
  return {
    type: actionTypes.GET_LIST_TEAM.reset()
  }
}

export const getListTeams = (params) => {
  return dispatch => {
    dispatch(getListStart())
    axios({
      method: 'get',
      url: `/api/teams/`,
      params: params,
    }).then(res => {
      if (res.data['code'] === 0) {
        dispatch(getListSuccess(res.data['data']))
      } else {
        dispatch(getListFail(res.data['msg']))
      }
    }).catch(err => {
      dispatch(getListFail(err.toString()))
    })
  }
}
