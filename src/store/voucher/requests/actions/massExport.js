import * as types from '../actionTypes'
import axios from 'axios-settings'
import FileSaver from 'file-saver'
import { setFeedbackMessage } from '../../../feedback/actions'
import { processDownloadFileResp } from '../../../helpers'

export const resetMassExportRequest = () => {
  return {
    type: types.MASS_EXPORT_REQUEST.reset(),
  }
}

const success = (code) => {
  return {
    type: types.MASS_EXPORT_REQUEST.success(),
    payload: { code },
  }
}

const fail = (error, code) => {
  return {
    type: types.MASS_EXPORT_REQUEST.fail(),
    payload: {
      error,
      code,
    },
  }
}

const start = () => {
  return {
    type: types.MASS_EXPORT_REQUEST.start(),
  }
}

export const massExportRequest = (params) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'post',
      url: `/api/vouchers/requests/mass_export/`,
      data: params,
      responseType: 'blob',
    }).then(res => {
      processDownloadFileResp(res, dispatch, success, fail)
    }).catch(err => {
      dispatch(fail(err.toString()))
    })
  }
}
