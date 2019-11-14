import * as types from '../actionTypes'
import axios from 'axios-settings'

export const resetGetListCampaigns = () => {
  return {
    type: types.GET_LIST_CAMPAIGNS.reset()
  }
}

const success = (data, pagination) => {
  return {
    type: types.GET_LIST_CAMPAIGNS.success(),
    payload: { data, pagination }
  }
}

const fail = (error) => {
  return {
    type: types.GET_LIST_CAMPAIGNS.fail(),
    payload: { error }
  }
}

const start = () => {
  return {
    type: types.GET_LIST_CAMPAIGNS.start()
  }
}

export const getListCampaigns = (params) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'get',
      url: `/api/campaigns/`,
      params: params,
    }).then(res => {
      if (res.data['code'] === 0) {
        const {records, paging} = res.data['data']
        dispatch(success(records, paging))
      } else {
        dispatch(fail(res.data['msg']))
      }
    }).catch(err => {
      dispatch(fail(err.toString()))
    })
  }
}
