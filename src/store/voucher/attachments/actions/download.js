import * as types from '../actionTypes'
import axios from 'axios-settings'
import { setFeedbackMessage } from '../../../feedback/actions'
import FileSaver from 'file-saver'
import { processDownloadFileResp } from '../../../helpers'

export const resetDownloadAttachmentFile = () => {
  return {
    type: types.DOWNLOAD_SUBMISSION_ATTACHMENT_FILE.reset()
  }
}

const success = () => {
  return {
    type: types.DOWNLOAD_SUBMISSION_ATTACHMENT_FILE.success(),
    payload: {}
  }
}

const fail = (error) => {
  return {
    type: types.DOWNLOAD_SUBMISSION_ATTACHMENT_FILE.fail(),
    payload: { error }
  }
}

const start = () => {
  return {
    type: types.DOWNLOAD_SUBMISSION_ATTACHMENT_FILE.start()
  }
}

export const downloadAttachmentFile = (id) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'post',
      url: `/api/vouchers/attachments/download/${id}/`,
      responseType: 'blob',
    }).then(res => {
      processDownloadFileResp(res, dispatch, success, fail)
    }).catch(err => {
      dispatch(fail(err.toString()))
      dispatch(setFeedbackMessage('error', err.toString()))
    })
  }
}
