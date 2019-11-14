import * as types from './types'
import axios from '../../../axios-settings'
import FileSaver from 'file-saver'
import { API_SUCCESS } from '../../../shared/constants'

export const resetUploadCommentAttachment = () => {
  return {
    type: types.UPLOAD_ATTACHMENT.reset(),
  }
}

const uploadCommentAttachmentSuccess = (data, code) => {
  return {
    type: types.UPLOAD_ATTACHMENT.success(),
    payload: {
      data,
      code,
    },
  }
}

const uploadCommentAttachmentFail = (error, code) => {
  return {
    type: types.UPLOAD_ATTACHMENT.fail(),
    payload: {
      error,
      code,
    },
  }
}

const uploadCommentAttachmentStart = () => {
  return {
    type: types.UPLOAD_ATTACHMENT.start(),
  }
}

export const uploadCommentAttachment = (params) => {
  return dispatch => {
    dispatch(uploadCommentAttachmentStart())
    axios({
      method: 'post',
      url: '/api/vouchers/file_attachments/',
      data: params,
    }).then(res => {
      const { msg, code, data } = res.data
      if (code === 0) {
        dispatch(uploadCommentAttachmentSuccess(data, code))
      } else {
        const error = data.file ? data.file : msg
        dispatch(uploadCommentAttachmentFail(error, code))
      }
    }).catch(err => {
      dispatch(uploadCommentAttachmentFail(err))
    })
  }
}

export const resetDownloadCommentAttachment = () => {
  return {
    type: types.DOWNLOAD_ATTACHMENT.reset(),
  }
}

const downloadCommentAttachmentSuccess = (code) => {
  return {
    type: types.DOWNLOAD_ATTACHMENT.success(),
    payload: { code },
  }
}

const downloadCommentAttachmentFail = (error, code) => {
  return {
    type: types.DOWNLOAD_ATTACHMENT.fail(),
    payload: {
      error,
      code,
    },
  }
}

const downloadCommentAttachmentStart = () => {
  return {
    type: types.DOWNLOAD_ATTACHMENT.start(),
  }
}

export const downloadCommentAttachment = (params) => {
  return dispatch => {
    dispatch(downloadCommentAttachmentStart())
    axios({
      method: 'post',
      url: `/api/vouchers/file_attachments/${params.id}/`,
      responseType: 'blob',
    }).then(res => {
      if (res.headers['content-type'] === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        let fileName = ''
        const disposition = res.headers['content-disposition']
        if (disposition && disposition.indexOf('attachment') !== -1) {
          const filenameRegex = new RegExp(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
          const matches = filenameRegex.exec(disposition)
          if (matches != null && matches[1]) {
            fileName = matches[1].replace(/['"]/g, '')
          }
        }
        FileSaver.saveAs(res.data, fileName)
        dispatch(downloadCommentAttachmentSuccess(API_SUCCESS))
      } else {
        dispatch(downloadCommentAttachmentFail(res.data['msg'], res.data['code']))
      }
    }).catch(err => {
      dispatch(downloadCommentAttachmentFail(err))
    })
  }
}
