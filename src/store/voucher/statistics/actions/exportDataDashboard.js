import * as types from '../actionTypes'
import axios from 'axios-settings'
import { setFeedbackMessage } from '../../../feedback/actions'
import { processDownloadFileResp } from '../../../helpers'

export const resetExportDataDashboard = () => {
  return {
    type: types.EXPORT_DATA_DASHBOARD.reset(),
  }
}

const success = (code) => {
  return {
    type: types.EXPORT_DATA_DASHBOARD.success(),
    payload: { code },
  }
}

const fail = (error, code) => {
  return {
    type: types.EXPORT_DATA_DASHBOARD.fail(),
    payload: {
      error,
      code,
    },
  }
}

const start = () => {
  return {
    type: types.EXPORT_DATA_DASHBOARD.start(),
  }
}

export const exportDataDashboard = (params) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'post',
      url: `/api/vouchers/statistics/export/`,
      data: params,
      responseType: 'blob',
    }).then(res => {
      processDownloadFileResp(res, dispatch, success, fail)
    }).catch(err => {
      dispatch(fail(err.toString()))
      dispatch(setFeedbackMessage('error', err.toString()))
    })
  }
}
