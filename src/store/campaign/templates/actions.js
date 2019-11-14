import * as types from './types'
import axios from '../../../axios-settings'
import { LOCALSTORAGE_PREFIX } from '../../../shared/constants'
import FileSaver from 'file-saver'

export const resetGetListTemplates = () => {
  return {
    type: types.GET_LIST_TEMPLATES.reset()
  }
}

const getListTemplatesSuccess = (data, pagination) => {
  return {
    type: types.GET_LIST_TEMPLATES.success(),
    payload: { data, pagination }
  }
}

const getListTemplatesFail = (error) => {
  return {
    type: types.GET_LIST_TEMPLATES.fail(),
    payload: { error }
  }
}

const getListTemplatesStart = () => {
  return {
    type: types.GET_LIST_TEMPLATES.start()
  }
}

export const getListTemplates = (params) => {
  const token = localStorage.getItem(`${LOCALSTORAGE_PREFIX}Token`)

  return dispatch => {
    dispatch(getListTemplatesStart())
    axios({
      method: 'get',
      url: `/api/templates/`,
      headers: { 'Authorization': 'JWT ' + token },
      params: params
    }).then(res => {
      if (res.data['code'] === 0) {
        const { records, paging } = res.data['data']
        dispatch(getListTemplatesSuccess(records, paging))
      } else {
        dispatch(getListTemplatesFail(res.data['msg']))
      }
    }).catch(err => {
      dispatch(getListTemplatesFail(err.toString()))
    })
  }
}

export const resetDeleteTemplate = () => {
  return {
    type: types.DELETE_TEMPLATE.reset()
  }
}

const deleteTemplateSuccess = (message) => {
  return {
    type: types.DELETE_TEMPLATE.success(),
    payload: { message }
  }
}

const deleteTemplateFail = (error) => {
  return {
    type: types.DELETE_TEMPLATE.fail(),
    payload: { error }
  }
}

const deleteTemplateStart = () => {
  return {
    type: types.DELETE_TEMPLATE.start()
  }
}

export const deleteTemplate = (params) => {
  const token = localStorage.getItem(`${LOCALSTORAGE_PREFIX}Token`)

  return dispatch => {
    dispatch(deleteTemplateStart())
    axios({
      method: 'delete',
      url: `/api/templates/${params.id}/`,
      headers: { 'Authorization': 'JWT ' + token }
    }).then(res => {
      if (res.data['code'] === 0) {
        dispatch(deleteTemplateSuccess(res.data['msg']))
      } else {
        dispatch(deleteTemplateFail(res.data['msg']))
      }
    }).catch(err => {
      dispatch(deleteTemplateFail(err.toString()))
    })
  }
}

export const resetGetTemplateDetail = () => {
  return {
    type: types.GET_TEMPLATE_DETAIL.reset()
  }
}

const getTemplateDetailSuccess = (data) => {
  return {
    type: types.GET_TEMPLATE_DETAIL.success(),
    payload: { data }
  }
}

const getTemplateDetailFail = (error) => {
  return {
    type: types.GET_TEMPLATE_DETAIL.fail(),
    payload: { error }
  }
}

const getTemplateDetailStart = () => {
  return {
    type: types.GET_TEMPLATE_DETAIL.start()
  }
}

export const getTemplateDetail = (params) => {
  const token = localStorage.getItem(`${LOCALSTORAGE_PREFIX}Token`)

  return dispatch => {
    dispatch(getTemplateDetailStart())
    axios({
      method: 'get',
      url: `/api/templates/${params.id}/`,
      headers: { 'Authorization': 'JWT ' + token }
    }).then(res => {
      if (res.data['code'] === 0) {
        dispatch(getTemplateDetailSuccess(res.data['data']))
      } else {
        dispatch(getTemplateDetailFail(res.data['msg']))
      }
    }).catch(err => {
      dispatch(getTemplateDetailFail(err.toString()))
    })
  }
}

export const resetGetTemplateMetrics = () => {
  return {
    type: types.GET_TEMPLATE_METRICS.reset()
  }
}

const getTemplateMetricsSuccess = (data) => {
  return {
    type: types.GET_TEMPLATE_METRICS.success(),
    payload: { data }
  }
}

const getTemplateMetricsFail = (error) => {
  return {
    type: types.GET_TEMPLATE_METRICS.fail(),
    payload: { error }
  }
}

const getTemplateMetricsStart = () => {
  return {
    type: types.GET_TEMPLATE_METRICS.start()
  }
}

export const getTemplateMetrics = () => {
  const token = localStorage.getItem(`${LOCALSTORAGE_PREFIX}Token`)

  return dispatch => {
    dispatch(getTemplateMetricsStart())
    axios({
      method: 'get',
      url: `/api/templates/metrics/`,
      headers: { 'Authorization': 'JWT ' + token }
    }).then(res => {
      if (res.data['code'] === 0) {
        dispatch(getTemplateMetricsSuccess(res.data['data']))
      } else {
        dispatch(getTemplateMetricsFail(res.data['msg']))
      }
    }).catch(err => {
      dispatch(getTemplateMetricsFail(err.toString()))
    })
  }
}

export const resetCreateTemplate = () => {
  return {
    type: types.CREATE_TEMPLATE.reset()
  }
}

const createTemplateSuccess = (message) => {
  return {
    type: types.CREATE_TEMPLATE.success(),
    payload: { message }
  }
}

const createTemplateFail = (error) => {
  return {
    type: types.CREATE_TEMPLATE.fail(),
    payload: { error }
  }
}

const createTemplateStart = () => {
  return {
    type: types.CREATE_TEMPLATE.start()
  }
}

export const createTemplate = (params) => {
  const token = localStorage.getItem(`${LOCALSTORAGE_PREFIX}Token`)

  return dispatch => {
    dispatch(createTemplateStart())
    axios({
      method: 'post',
      url: `/api/templates/`,
      headers: { 'Authorization': 'JWT ' + token },
      data: params
    }).then(res => {
      if (res.data['code'] === 0) {
        dispatch(createTemplateSuccess(res.data['msg']))
      } else {
        dispatch(createTemplateFail(res.data['msg']))
      }
    }).catch(err => {
      dispatch(createTemplateFail(err.toString()))
    })
  }
}

export const resetUpdateTemplate = () => {
  return {
    type: types.UPDATE_TEMPLATE.reset()
  }
}

const updateTemplateSuccess = (message) => {
  return {
    type: types.UPDATE_TEMPLATE.success(),
    payload: { message }
  }
}

const updateTemplateFail = (error) => {
  return {
    type: types.UPDATE_TEMPLATE.fail(),
    payload: { error }
  }
}

const updateTemplateStart = () => {
  return {
    type: types.UPDATE_TEMPLATE.start()
  }
}

export const updateTemplate = (params) => {
  const token = localStorage.getItem(`${LOCALSTORAGE_PREFIX}Token`)

  return dispatch => {
    dispatch(updateTemplateStart())
    axios({
      method: 'patch',
      url: `/api/templates/${params.id}/`,
      headers: { 'Authorization': 'JWT ' + token },
      data: params
    }).then(res => {
      if (res.data['code'] === 0) {
        dispatch(updateTemplateSuccess(res.data['msg']))
      } else {
        dispatch(updateTemplateFail(res.data['msg']))
      }
    }).catch(err => {
      dispatch(updateTemplateFail(err.toString()))
    })
  }
}

export const resetExportTemplate = () => {
  return {
    type: types.EXPORT_TEMPLATE.reset()
  }
}

const exportTemplateSuccess = (message) => {
  return {
    type: types.EXPORT_TEMPLATE.success(),
    payload: { message }
  }
}

const exportTemplateFail = (error) => {
  return {
    type: types.EXPORT_TEMPLATE.fail(),
    payload: { error }
  }
}

const exportTemplateStart = () => {
  return {
    type: types.EXPORT_TEMPLATE.start()
  }
}

export const exportTemplate = (params) => {
  const token = localStorage.getItem(`${LOCALSTORAGE_PREFIX}Token`)

  return dispatch => {
    dispatch(exportTemplateStart())
    axios({
      method: 'post',
      url: `/api/templates/export/${params.id}/`,
      headers: { 'Authorization': 'JWT ' + token },
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
        dispatch(exportTemplateSuccess('Success'))
      } else {
        dispatch(exportTemplateFail(res.data['msg']))
      }
    }).catch(err => {
      dispatch(exportTemplateFail(err.toString()))
    })
  }
}
