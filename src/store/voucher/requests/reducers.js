import * as getList from './slices/getList'
import * as detail from './slices/detail'
import * as massExport from './slices/massExport'
import * as massUpdate from './slices/massUpdate'
import * as importRequest from './slices/importRequest'
import * as exportRequest from './slices/exportRequest'
import * as exportRequestTemplate from './slices/exportRequestTemplate'
import * as websocket from './slices/websocket'

const initialState = {
  getList: getList.initial,
  detail: detail.initial,
  massExport: massExport.initial,
  massUpdate: massUpdate.initial,
  importRequest: importRequest.initial,
  exportRequest: exportRequest.initial,
  exportRequestTemplate: exportRequestTemplate.initial,
  websocket: websocket.initial,
}

const reducer = (state = initialState, action) => {
  return {
    ...state,
    getList: getList.reducer(state.getList, action),
    detail: detail.reducer(state.detail, action),
    massExport: massExport.reducer(state.massExport, action),
    massUpdate: massUpdate.reducer(state.massUpdate, action),
    importRequest: importRequest.reducer(state.importRequest, action),
    exportRequest: exportRequest.reducer(state.exportRequest, action),
    exportRequestTemplate: exportRequestTemplate.reducer(state.exportRequestTemplate, action),
    websocket: websocket.reducer(state.websocket, action),
  }
}

export default reducer
