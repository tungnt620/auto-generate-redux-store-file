import * as getListTemplates from './slices/getListTemplates'
import * as deleteTemplates from './slices/deleteTemplates'
import * as getTemplateDetail from './slices/getTemplateDetail'
import * as getTemplateMetrics from './slices/getTemplateMetrics'
import * as createTemplate from './slices/createTemplate'
import * as updateTemplate from './slices/updateTemplate'
import * as exportTemplate from './slices/exportTemplate'
import * as templateIDDetailMap from './slices/templateIDDetailMap'

const initialState = {
  getListTemplates: getListTemplates.initial,
  deleteTemplates: deleteTemplates.initial,
  getTemplateDetail: getTemplateDetail.initial,
  getTemplateMetrics: getTemplateMetrics.initial,
  createTemplate: createTemplate.initial,
  updateTemplate: updateTemplate.initial,
  exportTemplate: exportTemplate.initial,
  templateIDDetailMap: templateIDDetailMap.initial,
}

const reducer = (state = initialState, action) => {
  return {
    ...state,
    getListTemplates: getListTemplates.reducer(state.getListTemplates, action),
    deleteTemplates: deleteTemplates.reducer(state.deleteTemplates, action),
    getTemplateDetail: getTemplateDetail.reducer(state.getTemplateDetail, action),
    getTemplateMetrics: getTemplateMetrics.reducer(state.getTemplateMetrics, action),
    createTemplate: createTemplate.reducer(state.createTemplate, action),
    updateTemplate: updateTemplate.reducer(state.updateTemplate, action),
    exportTemplate: exportTemplate.reducer(state.exportTemplate, action),
    templateIDDetailMap: templateIDDetailMap.reducer(state.templateIDDetailMap, action),
  }
}

export default reducer
