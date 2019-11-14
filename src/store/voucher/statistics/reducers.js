import * as exportDataDashboard from './slices/exportDataDashboard'
import * as getListDataDashboard from './slices/getListDataDashboard'

const initialState = {
  exportDataDashboard: exportDataDashboard.initial,
  getListDataDashboard: getListDataDashboard.initial,
}

const reducer = (state = initialState, action) => {
  return {
    ...state,
    exportDataDashboard: exportDataDashboard.reducer(state.exportDataDashboard, action),
    getListDataDashboard: getListDataDashboard.reducer(state.getListDataDashboard, action),
  }
}

export default reducer
