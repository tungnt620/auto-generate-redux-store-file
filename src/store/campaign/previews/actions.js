import * as types from './types'
import axios from '../../../axios-settings'
import FileSaver from 'file-saver'
import { LOCALSTORAGE_PREFIX } from '../../../shared/constants'

export const resetExportPreview = () => {
  return {
    type: types.EXPORT_PREVIEW.reset()
  }
}

const exportPreviewSuccess = (message) => {
  return {
    type: types.EXPORT_PREVIEW.success(),
    payload: { message }
  }
}

const exportPreviewFail = (error) => {
  return {
    type: types.EXPORT_PREVIEW.fail(),
    payload: { error }
  }
}

const exportPreviewStart = () => {
  return {
    type: types.EXPORT_PREVIEW.start()
  }
}

export const exportPreview = (params) => {
  const token = localStorage.getItem(`${LOCALSTORAGE_PREFIX}Token`)

  return dispatch => {
    dispatch(exportPreviewStart())
    axios({
      method: 'post',
      url: `/api/previews/`,
      headers: { 'Authorization': 'JWT ' + token },
      data: params,
      responseType: 'blob'
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
        dispatch(exportPreviewSuccess('Success'))
      } else {
        dispatch(exportPreviewFail(res.data['msg']))
      }
    }).catch(err => {
      dispatch(exportPreviewFail(err.toString()))
    })
  }
}
