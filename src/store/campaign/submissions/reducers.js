import * as exportSubmissions from './slices/exportSubmissions'
import * as importSubmissions from './slices/importSubmissions'
import * as getListSubmissions from './slices/getListSubmissions'
import * as updateSubmission from './slices/updateSubmission'
import * as submissionsWebSocket from './slices/submissionsWebSocket'

const initialState = {
  exportSubmissions: exportSubmissions.initial,
  importSubmissions: importSubmissions.initial,
  getListSubmissions: getListSubmissions.initial,
  updateSubmission: updateSubmission.initial,
  submissionsWebSocket: submissionsWebSocket.initial
}

const reducer = (state = initialState, action) => {
  return {
    ...state,
    exportSubmissions: exportSubmissions.reducer(state.exportSubmissions, action),
    importSubmissions: importSubmissions.reducer(state.importSubmissions, action),
    getListSubmissions: getListSubmissions.reducer(state.getListSubmissions, action),
    updateSubmission: updateSubmission.reducer(state.updateSubmission, action),
    submissionsWebSocket: submissionsWebSocket.reducer(state.submissionsWebSocket, action)
  }
}

export default reducer