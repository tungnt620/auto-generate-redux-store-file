import * as types from '../actionTypes'
import axios from 'axios-settings'
import FileSaver from 'file-saver'
import { setFeedbackMessage } from '../../../feedback/actions'
import { processDownloadFileResp } from '../../../helpers'

export const resetExportRequestTemplate = () => {
  return {
    type: types.EXPORT_REQUEST_TEMPLATE.reset(),
  }
}

const success = (code) => {
  return {
    type: types.EXPORT_REQUEST_TEMPLATE.success(),
    payload: { code },
  }
}

const fail = (error, code) => {
  return {
    type: types.EXPORT_REQUEST_TEMPLATE.fail(),
    payload: {
      error,
      code,
    },
  }
}

const start = () => {
  return {
    type: types.EXPORT_REQUEST_TEMPLATE.start(),
  }
}

export const exportRequestTemplate = (params) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'post',
      url: `/api/vouchers/requests/templates/export/`,
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
