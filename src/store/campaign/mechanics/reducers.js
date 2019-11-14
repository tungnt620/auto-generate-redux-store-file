import * as detail from './slices/detail'
import * as mechanicIDMetaDataMap from './slices/mechanicIDMetaDataMap'
import * as getList from './slices/getList'

const initialState = {
  detail: detail.initial,
  mechanicIDMetaDataMap: mechanicIDMetaDataMap.initial,
  getList: getList.initial,
}

const reducer = (state = initialState, action) => {
  return {
    ...state,
    detail: detail.reducer(state.detail, action),
    mechanicIDMetaDataMap: mechanicIDMetaDataMap.reducer(state.mechanicIDMetaDataMap, action),
    getList: getList.reducer(state.getList, action),
  }
}

export default reducer
