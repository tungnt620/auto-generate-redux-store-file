import * as actionTypes from './actionTypes'
import axios from 'axios-settings'

const getListSuccess = (data) => {
  return {
    type: actionTypes.GET_LIST_GROUP_CAT.success(),
    payload: { data }
  }
}

const getListFail = (error) => {
  return {
    type: actionTypes.GET_LIST_GROUP_CAT.fail(),
    payload: { error }
  }
}

const getListStart = () => {
  return {
    type: actionTypes.GET_LIST_GROUP_CAT.start()
  }
}

export const resetGetListGroupCategories = () => {
  return {
    type: actionTypes.GET_LIST_GROUP_CAT.reset()
  }
}

export const getListGroupCategories = () => {
  return dispatch => {
    dispatch(getListStart())
    axios({
      method: 'get',
      url: `/api/group-categories/`,
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
