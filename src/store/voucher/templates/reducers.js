import * as getListTemplates from './slices/getListTemplates'
import * as deleteTemplate from './slices/deleteTemplate'
import * as exportTemplate from './slices/exportTemplate'
import * as getTemplateMetrics from './slices/getTemplateMetrics'
import * as getTemplateDetail from './slices/getTemplateDetail'
import * as createTemplate from './slices/createTemplate'
import * as updateTemplate from './slices/updateTemplate'
import * as downloadPreview from './slices/downloadPreview'

const initialState = {
  getListTemplates: getListTemplates.initial,
  deleteTemplate: deleteTemplate.initial,
  exportTemplate: exportTemplate.initial,
  getTemplateMetrics: getTemplateMetrics.initial,
  getTemplateDetail: getTemplateDetail.initial,
  createTemplate: createTemplate.initial,
  updateTemplate: updateTemplate.initial,
  downloadPreview: downloadPreview.initial,
}

const reducer = (state = initialState, action) => {
  return {
    ...state,
    getListTemplates: getListTemplates.reducer(state.getListTemplates, action),
    deleteTemplate: deleteTemplate.reducer(state.deleteTemplate, action),
    exportTemplate: exportTemplate.reducer(state.exportTemplate, action),
    getTemplateMetrics: getTemplateMetrics.reducer(state.getTemplateMetrics, action),
    getTemplateDetail: getTemplateDetail.reducer(state.getTemplateDetail, action),
    createTemplate: createTemplate.reducer(state.createTemplate, action),
    updateTemplate: updateTemplate.reducer(state.updateTemplate, action),
    downloadPreview: downloadPreview.reducer(state.downloadPreview, action),
  }
}

export default reducer
