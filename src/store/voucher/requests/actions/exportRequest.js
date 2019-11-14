import * as types from '../actionTypes'
import axios from 'axios-settings'
import FileSaver from 'file-saver'
import { setFeedbackMessage } from '../../../feedback/actions'
import { processDownloadFileResp } from '../../../helpers'

export const resetExportRequest = () => {
  return {
    type: types.EXPORT_REQUEST.reset(),
  }
}

const success = (code) => {
  return {
    type: types.EXPORT_REQUEST.success(),
    payload: { code },
  }
}

const fail = (error, code) => {
  return {
    type: types.EXPORT_REQUEST.fail(),
    payload: {
      error,
      code,
    },
  }
}

const start = () => {
  return {
    type: types.EXPORT_REQUEST.start(),
  }
}

export const exportRequest = (id) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'post',
      url: `/api/vouchers/requests/export/${id}/`,
      responseType: 'blob',
    }).then(res => {
      processDownloadFileResp(res, dispatch, success, fail)
    }).catch(err => {
      dispatch(fail(err.toString()))
      dispatch(setFeedbackMessage('error', err.toString()))
    })
  }
}
