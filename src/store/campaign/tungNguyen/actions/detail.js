import * as types from '../actionTypes'
import axios from 'axios-settings'
import { setFeedbackMessage } from 'src/store/feedback/actions'
import { API_CAMPAIGN_UPD_ERROR } from 'shared/constants'

export const resetCampaignDetail = () => {
  return {
    type: types.CAMPAIGN_DETAIL.reset()
  }
}

export const resetCreateUpdateDeleteState = () => {
  return {
    type: types.CAMPAIGN_DETAIL.success(),
    payload: { created: false, updated: false, deleted: false }
  }
}

const success = (payload) => {
  return {
    type: types.CAMPAIGN_DETAIL.success(),
    payload,
  }
}

const fail = (error) => {
  return {
    type: types.CAMPAIGN_DETAIL.fail(),
    payload: { error }
  }
}

const start = () => {
  return {
    type: types.CAMPAIGN_DETAIL.start()
  }
}

export const getDetailCampaign = (id) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'get',
      url: `/api/tungNguyen/${id}/`,
    }).then(res => {
      if (res.data['code'] === 0) {
        dispatch(success({ data: res.data['data'] }))
      } else {
        dispatch(fail(res.data['msg']))
      }
    }).catch(err => {
      dispatch(fail(err.toString()))
    })
  }
}

export const createCampaign = (data) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'post',
      url: `/api/tungNguyen/`,
      data: data,
    }).then(res => {
      if (res.data['code'] === 0) {
        dispatch(success({
          data: res.data['data'],
          created: true
        }))
        dispatch(setFeedbackMessage('success', 'Campaign has been created!'))
      } else {
        const message = res.data['msg']
        dispatch(fail(message))
        dispatch(setFeedbackMessage('error', message))
      }
    }).catch(err => {
      dispatch(fail(err.toString()))
      dispatch(setFeedbackMessage('error', err.toString()))
    })
  }
}

export const updateCampaign = (campaignID, data) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'patch',
      url: `/api/tungNguyen/${campaignID}/`,
      data: data,
    }).then(res => {
      const code = res.data['code']
      if (code === 0) {
        dispatch(success({
          data: res.data['data'],
          updated: true,
        }))
        dispatch(setFeedbackMessage('success', 'Campaign has been updated!'))
      } else {
        let message = res.data['msg']
        if (code === API_CAMPAIGN_UPD_ERROR) {
          message = res.data['data'].msgDisplay
        }

        dispatch(fail(message))
        dispatch(setFeedbackMessage('error', message))
      }
    }).catch(err => {
      dispatch(fail(err.toString()))
      dispatch(setFeedbackMessage('error', err.toString()))
    })
  }
}

export const deleteCampaign = (campaignID) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'delete',
      url: `/api/tungNguyen/${campaignID}/`,
    }).then(res => {
      if (res.data['code'] === 0) {
        dispatch(success({
          data: null,
          deleted: true,
        }))
        dispatch(setFeedbackMessage('success', 'Campaign has been deleted!'))
      } else {
        const message = res.data['msg']
        dispatch(fail(message))
        dispatch(setFeedbackMessage('error', message))
      }
    }).catch(err => {
      dispatch(fail(err.toString()))
      dispatch(setFeedbackMessage('error', err.toString()))
    })
  }
}
