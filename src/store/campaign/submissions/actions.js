import * as types from './types'
import axios from '../../../axios-settings'
import FileSaver from 'file-saver'
import Sockette from 'sockette'
import { API_SUCCESS, API_VALIDATION_ERROR, LOCALSTORAGE_PREFIX } from '../../../shared/constants'

export const resetExportSubmissions = () => {
  return {
    type: types.EXPORT_SUBMISSIONS.reset(),
  }
}

const exportSubmissionsSuccess = (message) => {
  return {
    type: types.EXPORT_SUBMISSIONS.success(),
    payload: { message },
  }
}

const exportSubmissionsFail = (error) => {
  return {
    type: types.EXPORT_SUBMISSIONS.fail(),
    payload: { error },
  }
}

const exportSubmissionsStart = () => {
  return {
    type: types.EXPORT_SUBMISSIONS.start(),
  }
}

export const exportSubmissions = (params) => {
  const token = localStorage.getItem(`${LOCALSTORAGE_PREFIX}Token`)

  return dispatch => {
    dispatch(exportSubmissionsStart())
    axios({
      method: 'post',
      url: `/api/submissions/export/`,
      headers: { 'Authorization': 'JWT ' + token },
      data: params,
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
        dispatch(exportSubmissionsSuccess('Success'))
      } else {
        dispatch(exportSubmissionsFail(res.data['data']['_']))
      }
    }).catch(err => {
      dispatch(exportSubmissionsFail(err.toString()))
    })
  }
}

export const resetImportSubmissions = () => {
  return {
    type: types.IMPORT_SUBMISSIONS.reset(),
  }
}

const importSubmissionsSuccess = (message) => {
  return {
    type: types.IMPORT_SUBMISSIONS.success(),
    payload: { message },
  }
}

const importSubmissionsFail = (error) => {
  return {
    type: types.IMPORT_SUBMISSIONS.fail(),
    payload: { error },
  }
}

const importSubmissionsStart = () => {
  return {
    type: types.IMPORT_SUBMISSIONS.start(),
  }
}

export const importSubmissions = (params) => {
  const token = localStorage.getItem(`${LOCALSTORAGE_PREFIX}Token`)

  return dispatch => {
    dispatch(importSubmissionsStart())
    axios({
      method: 'post',
      url: `/api/submissions/import/`,
      headers: { 'Authorization': 'JWT ' + token },
      data: params,
    }).then(res => {
      if (res.data['code'] === API_SUCCESS) {
        dispatch(importSubmissionsSuccess(res.data['data']))
      } else if (res.data['code'] === API_VALIDATION_ERROR) {
        dispatch(importSubmissionsFail(res.data['data']['_']))
      } else {
        dispatch(importSubmissionsFail(res.data['msg']))
      }
    }).catch(err => {
      dispatch(importSubmissionsFail(err.toString()))
    })
  }
}

export const resetGetListSubmissions = () => {
  return {
    type: types.GET_LIST_SUBMISSIONS.reset(),
  }
}

const getListSubmissionsSuccess = (data) => {
  return {
    type: types.GET_LIST_SUBMISSIONS.success(),
    payload: { data },
  }
}

const getListSubmissionsFail = (error) => {
  return {
    type: types.GET_LIST_SUBMISSIONS.fail(),
    payload: { error },
  }
}

const getListSubmissionsStart = () => {
  return {
    type: types.GET_LIST_SUBMISSIONS.start(),
  }
}

export const getListSubmissions = (params) => {
  const token = localStorage.getItem(`${LOCALSTORAGE_PREFIX}Token`)

  return dispatch => {
    dispatch(getListSubmissionsStart())
    axios({
      method: 'get',
      url: `/api/submissions/`,
      headers: { 'Authorization': 'JWT ' + token },
      params: params,
    }).then(res => {
      if (res.data['code'] === 0) {
        dispatch(getListSubmissionsSuccess(res.data['data']))
      } else {
        dispatch(getListSubmissionsFail(res.data['msg']))
      }
    }).catch(err => {
      dispatch(getListSubmissionsFail(err.toString()))
    })
  }
}

export const resetUpdateSubmission = () => {
  return {
    type: types.UPDATE_SUBMISSION.reset(),
  }
}

const updateSubmissionSuccess = (data) => {
  return {
    type: types.UPDATE_SUBMISSION.success(),
    payload: { data },
  }
}

const updateSubmissionFail = (error) => {
  return {
    type: types.UPDATE_SUBMISSION.fail(),
    payload: { error },
  }
}

const updateSubmissionStart = () => {
  return {
    type: types.UPDATE_SUBMISSION.start(),
  }
}

export const updateSubmission = (params) => {
  const token = localStorage.getItem(`${LOCALSTORAGE_PREFIX}Token`)
  return dispatch => {
    dispatch(updateSubmissionStart())
    axios({
      method: 'patch',
      url: `/api/submissions/${params.id}/`,
      headers: { 'Authorization': 'JWT ' + token },
      data: { data: params.data },
    }).then(res => {
      if (res.data['code'] === API_SUCCESS) {
        dispatch(updateSubmissionSuccess(res.data['data']))
      } else if (res.data['code'] === API_VALIDATION_ERROR) {
        dispatch(updateSubmissionFail(res.data['data']['_']))
      } else {
        dispatch(updateSubmissionFail(res.data['msg']))
      }
    }).catch(err => {
      dispatch(updateSubmissionFail(err.toString()))
    })
  }
}

export const createSubmission = (params) => {
  const token = localStorage.getItem(`${LOCALSTORAGE_PREFIX}Token`)
  return dispatch => {
    dispatch(updateSubmissionStart())
    axios({
      method: 'post',
      url: `/api/submissions/`,
      headers: { 'Authorization': 'JWT ' + token },
      data: params,
    }).then(res => {
      if (res.data['code'] === API_SUCCESS) {
        dispatch(updateSubmissionSuccess(res.data['data']))
      } else if (res.data['code'] === API_VALIDATION_ERROR) {
        dispatch(updateSubmissionFail(res.data['data']['_']))
      } else {
        dispatch(updateSubmissionFail(res.data['msg']))
      }
    }).catch(err => {
      dispatch(updateSubmissionFail(err.toString()))
    })
  }
}

let ws = null

export const resetSubmissionsWebSocket = () => {
  return {
    type: types.SUBMISSIONS_WEB_SOCKET.reset(),
  }
}

export const resetSubmissionsWebSocketOnUpdate = () => {
  return {
    type: types.SUBMISSIONS_WEB_SOCKET.custom('RESET_ON_UPDATE'),
  }
}

const submissionsWebSocketStart = () => {
  return {
    type: types.SUBMISSIONS_WEB_SOCKET.start(),
  }
}

const submissionsWebSocketFail = (error) => {
  return {
    type: types.SUBMISSIONS_WEB_SOCKET.fail(),
    payload: { error },
  }
}

const submissionsWebSocketReceive = (data) => {
  return {
    type: types.SUBMISSIONS_WEB_SOCKET.custom('RECEIVED'),
    payload: { data },
  }
}

export const connectSubmissionsWebSocket = (id) => {
  return dispatch => {
    ws = new Sockette(`${process.env.REACT_APP_SOCKET_BASE_URL}/ws/submission/${id}/`, {
      onopen: () => dispatch(submissionsWebSocketStart()),
      onmessage: e => dispatch(submissionsWebSocketReceive(JSON.parse(e.data))),
      onerror: () => dispatch(submissionsWebSocketFail('error')),
    })
  }
}

export const sendSubmissionsWebSocket = (data) => {
  if (ws) {
    ws.send(data)
    return {
      type: types.SUBMISSIONS_WEB_SOCKET.custom('SENDING'),
    }
  }
}

export const closeSubmissionWebSocket = () => {
  if (ws) {
    ws.close(1000)
    return {
      type: types.SUBMISSIONS_WEB_SOCKET.custom('CLOSED'),
    }
  }
}
