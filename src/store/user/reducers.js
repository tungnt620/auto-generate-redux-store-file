import * as login from './slices/login'
import * as info from './slices/info'
import * as report from './slices/report'
import * as getList from './slices/getList'

const initialState = {
  login: login.initialState,
  info: info.initialState,
  report: report.initialState,
  getList: getList.initialState,
}

const reducer = (state = initialState, action) => {
  return {
    ...state,
    login: login.reducer(state.login, action),
    info: info.reducer(state.info, action),
    report: report.reducer(state.report, action),
    getList: getList.reducer(state.getList, action),
  }
}

export default reducer
