import * as actionTypes from './actionTypes'
import axios from 'axios-settings'

const getListSuccess = (data) => {
  return {
    type: actionTypes.GET_LIST_CATEGORY.success(),
    payload: { data }
  }
}

const getListFail = (error) => {
  return {
    type: actionTypes.GET_LIST_CATEGORY.fail(),
    payload: { error }
  }
}

const getListStart = () => {
  return {
    type: actionTypes.GET_LIST_CATEGORY.start()
  }
}

export const resetGetListCategories = () => {
  return {
    type: actionTypes.GET_LIST_CATEGORY.reset()
  }
}

export const addToGroupCatIDCatMap = (groupCatID, data) => {
  return {
    type: actionTypes.GET_LIST_CATEGORY.custom('addToGroupCatIDCatMap'),
    payload: { groupCatID, data },
  }
}

export const resetGroupCatIDCatMap = () => {
  return {
    type: actionTypes.GET_LIST_CATEGORY.custom('resetToGroupCatIDCatMap'),
  }
}

export const getListCategories = (params) => {
  return dispatch => {
    dispatch(getListStart())
    axios({
      method: 'get',
      url: `/api/categories/`,
      params,
    }).then(res => {
      if (res.data['code'] === 0) {
        dispatch(getListSuccess(res.data['data']))
        if (params.filter.group_category_id && typeof params.filter.group_category_id === 'number') {
          dispatch(addToGroupCatIDCatMap(params.filter.group_category_id, res.data['data']))
        }
      } else {
        dispatch(getListFail(res.data['msg']))
      }
    }).catch(err => {
      dispatch(getListFail(err.toString()))
    })
  }
}
