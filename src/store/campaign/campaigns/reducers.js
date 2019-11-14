import * as getList from './slices/getList'
import * as detail from './slices/detail'
import * as exportState from './slices/export'

const initialState = {
  getList: getList.initial,
  detail: detail.initial,
  exportState: exportState.initial,
}

const reducer = (state = initialState, action) => {
  return {
    ...state,
    getList: getList.reducer(state.getList, action),
    detail: detail.reducer(state.detail, action),
    exportState: exportState.reducer(state.exportState, action),
  }
}

export default reducer
