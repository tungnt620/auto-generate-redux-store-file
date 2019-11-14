import * as types from './types'
import axios from '../../../axios-settings'
import FileSaver from 'file-saver'
import { API_INVALID_ACTION, API_FAILURE, API_SUCCESS } from '../../../shared/constants'

const baseDomain = '/api/vouchers/templates/'

export const resetGetListVoucherTemplates = () => {
  return {
    type: types.VOUCHER_GET_LIST_TEMPLATES.reset(),
  }
}

const getListVoucherTemplatesSuccess = (data, pagination, code) => {
  return {
    type: types.VOUCHER_GET_LIST_TEMPLATES.success(),
    payload: {
      data,
      pagination,
      code,
    },
  }
}

const getListVoucherTemplatesFail = (error, code) => {
  return {
    type: types.VOUCHER_GET_LIST_TEMPLATES.fail(),
    payload: {
      error,
      code,
    },
  }
}

const getListVoucherTemplatesStart = () => {
  return {
    type: types.VOUCHER_GET_LIST_TEMPLATES.start(),
  }
}

export const getListVoucherTemplates = (params) => {
  return dispatch => {
    dispatch(getListVoucherTemplatesStart())
    axios({
      method: 'get',
      url: `${baseDomain}`,
      params: params,
    }).then(res => {
      if (res.data['code'] === 0) {
        const { records, paging } = res.data['data']
        dispatch(getListVoucherTemplatesSuccess(records, paging, res.data['code']))
      } else {
        dispatch(getListVoucherTemplatesFail(res.data['msg'], res.data['code']))
      }
    }).catch(err => {
      dispatch(getListVoucherTemplatesFail(err.toString()))
    })
  }
}

export const resetDeleteVoucherTemplate = () => {
  return {
    type: types.VOUCHER_DELETE_TEMPLATE.reset(),
  }
}

const deleteVoucherTemplateSuccess = (code) => {
  return {
    type: types.VOUCHER_DELETE_TEMPLATE.success(),
    payload: { code },
  }
}

const deleteVoucherTemplateFail = (error, code) => {
  return {
    type: types.VOUCHER_DELETE_TEMPLATE.fail(),
    payload: {
      error,
      code,
    },
  }
}

const deleteVoucherTemplateStart = () => {
  return {
    type: types.VOUCHER_DELETE_TEMPLATE.start(),
  }
}

export const deleteVoucherTemplate = (params) => {
  return dispatch => {
    dispatch(deleteVoucherTemplateStart())
    axios({
      method: 'delete',
      url: `/api/vouchers/templates/${params.id}/`,
    }).then(res => {
      const { msg, code, data } = res.data
      if (code === 0) {
        dispatch(deleteVoucherTemplateSuccess(code))
      } else if (code === API_INVALID_ACTION && data._) {
        dispatch(deleteVoucherTemplateFail(data._, code))
      } else {
        dispatch(deleteVoucherTemplateFail(msg, code))
      }
    }).catch(err => {
      dispatch(deleteVoucherTemplateFail(err.toString()))
    })
  }
}

export const resetExportVoucherTemplate = () => {
  return {
    type: types.VOUCHER_EXPORT_TEMPLATE.reset(),
  }
}

const exportVoucherTemplateSuccess = (code) => {
  return {
    type: types.VOUCHER_EXPORT_TEMPLATE.success(),
    payload: { code },
  }
}

const exportVoucherTemplateFail = (error, code) => {
  return {
    type: types.VOUCHER_EXPORT_TEMPLATE.fail(),
    payload: {
      error,
      code,
    },
  }
}

const exportVoucherTemplateStart = () => {
  return {
    type: types.VOUCHER_EXPORT_TEMPLATE.start(),
  }
}

export const exportVoucherTemplate = (params) => {
  return dispatch => {
    dispatch(exportVoucherTemplateStart())
    axios({
      method: 'post',
      url: `/api/vouchers/templates/export/${params.id}/`,
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
        dispatch(exportVoucherTemplateSuccess(0))
      } else {
        dispatch(exportVoucherTemplateFail(res.data['msg'], res.data['code']))
      }
    }).catch(err => {
      dispatch(exportVoucherTemplateFail(err.toString()))
    })
  }
}

export const resetGetVoucherTemplateMetrics = () => {
  return {
    type: types.VOUCHER_GET_TEMPLATE_METRICS.reset(),
  }
}

const getVoucherTemplateMetricsSuccess = (data, code) => {
  return {
    type: types.VOUCHER_GET_TEMPLATE_METRICS.success(),
    payload: {
      data,
      code,
    },
  }
}

const getVoucherTemplateMetricsFail = (error, code) => {
  return {
    type: types.VOUCHER_GET_TEMPLATE_METRICS.fail(),
    payload: {
      error,
      code,
    },
  }
}

const getVoucherTemplateMetricsStart = () => {
  return {
    type: types.VOUCHER_GET_TEMPLATE_METRICS.start(),
  }
}

export const getVoucherTemplateMetrics = () => {
  return dispatch => {
    dispatch(getVoucherTemplateMetricsStart())
    axios({
      method: 'get',
      url: `${baseDomain}metrics/`,
    }).then(res => {
      const { data, msg, code } = res.data
      if (code === 0) {
        dispatch(getVoucherTemplateMetricsSuccess(data, code))
      } else {
        dispatch(getVoucherTemplateMetricsFail(msg, code))
      }
    }).catch(err => {
      dispatch(getVoucherTemplateMetricsFail(err.toString()))
    })
  }
}

export const resetGetVoucherTemplateDetail = () => {
  return {
    type: types.VOUCHER_GET_TEMPLATE_DETAIL.reset(),
  }
}

const getVoucherTemplateDetailSuccess = (data, code) => {
  return {
    type: types.VOUCHER_GET_TEMPLATE_DETAIL.success(),
    payload: {
      data,
      code,
    },
  }
}

const getVoucherTemplateDetailFail = (error, code) => {
  return {
    type: types.VOUCHER_GET_TEMPLATE_DETAIL.fail(),
    payload: {
      error,
      code,
    },
  }
}

const getVoucherTemplateDetailStart = () => {
  return {
    type: types.VOUCHER_GET_TEMPLATE_DETAIL.start(),
  }
}

export const getVoucherTemplateDetail = (params) => {
  return dispatch => {
    dispatch(getVoucherTemplateDetailStart())
    axios({
      method: 'get',
      url: `${baseDomain}${params.id}/`,
    }).then(res => {
      const { data, msg, code } = res.data
      if (code === 0) {
        dispatch(getVoucherTemplateDetailSuccess(data, code))
      } else {
        dispatch(getVoucherTemplateDetailFail(msg, code))
      }
    }).catch(err => {
      dispatch(getVoucherTemplateDetailFail(err.toString()))
    })
  }
}

export const resetCreateVoucherTemplate = () => {
  return {
    type: types.VOUCHER_CREATE_TEMPLATE.reset(),
  }
}

const createVoucherTemplateSuccess = (code) => {
  return {
    type: types.VOUCHER_CREATE_TEMPLATE.success(),
    payload: { code },
  }
}

const createVoucherTemplateFail = (error, code) => {
  return {
    type: types.VOUCHER_CREATE_TEMPLATE.fail(),
    payload: {
      error,
      code,
    },
  }
}

const createVoucherTemplateStart = () => {
  return {
    type: types.VOUCHER_CREATE_TEMPLATE.start(),
  }
}

export const createVoucherTemplate = (params) => {
  return dispatch => {
    dispatch(createVoucherTemplateStart())
    axios({
      method: 'post',
      url: `${baseDomain}`,
      data: params,
    }).then(res => {
      const { msg, code, data } = res.data
      if (code === API_SUCCESS) {
        dispatch(createVoucherTemplateSuccess(code))
      } else if (code === API_INVALID_ACTION && data._) {
        dispatch(createVoucherTemplateFail(data._, code))
      } else {
        dispatch(createVoucherTemplateFail(msg, code))
      }
    }).catch(err => {
      dispatch(createVoucherTemplateFail(err.toString()))
    })
  }
}

export const resetUpdateVoucherTemplate = () => {
  return {
    type: types.VOUCHER_UPDATE_TEMPLATE.reset(),
  }
}

const updateVoucherTemplateSuccess = (code) => {
  return {
    type: types.VOUCHER_UPDATE_TEMPLATE.success(),
    payload: { code },
  }
}

const updateVoucherTemplateFail = (error, code) => {
  return {
    type: types.VOUCHER_UPDATE_TEMPLATE.fail(),
    payload: {
      error,
      code,
    },
  }
}

const updateVoucherTemplateStart = () => {
  return {
    type: types.VOUCHER_UPDATE_TEMPLATE.start(),
  }
}

export const updateVoucherTemplate = (params) => {
  return dispatch => {
    dispatch(updateVoucherTemplateStart())
    axios({
      method: 'patch',
      url: `${baseDomain}${params.id}/`,
      data: params,
    }).then(res => {
      const { msg, code, data } = res.data
      if (code === 0) {
        dispatch(updateVoucherTemplateSuccess(code))
      } else if (code === API_INVALID_ACTION && data._) {
        dispatch(updateVoucherTemplateFail(data._, code))
      } else {
        dispatch(updateVoucherTemplateFail(msg, code))
      }
    }).catch(err => {
      dispatch(updateVoucherTemplateFail(err.toString()))
    })
  }
}

export const resetDownloadPreview = () => {
  return {
    type: types.VOUCHER_DOWNLOAD_PREVIEW.reset(),
  }
}

const downloadPreviewSuccess = (code) => {
  return {
    type: types.VOUCHER_DOWNLOAD_PREVIEW.success(),
    payload: { code },
  }
}

const downloadPreviewFail = (error, code) => {
  return {
    type: types.VOUCHER_DOWNLOAD_PREVIEW.fail(),
    payload: {
      error,
      code,
    },
  }
}

const downloadPreviewStart = () => {
  return {
    type: types.VOUCHER_DOWNLOAD_PREVIEW.start(),
  }
}

export const downloadPreview = (params) => {
  return dispatch => {
    dispatch(downloadPreviewStart())
    axios({
      method: 'post',
      url: `${baseDomain}previews/`,
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
        dispatch(downloadPreviewSuccess(API_SUCCESS))
      } else {
        dispatch(downloadPreviewFail('Download fail', API_FAILURE))
      }
    }).catch(err => {
      dispatch(downloadPreviewFail(err.toString()))
    })
  }
}
