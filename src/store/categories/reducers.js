import * as getList from './slices/getList'
import * as groupCatIDCatMap from './slices/groupCatIDCatMap'

const initialState = {
  getList: getList.initialState,
  groupCatIDCatMap: groupCatIDCatMap.initialState,
}

const reducer = (state = initialState, action) => {
  return {
    ...state,
    getList: getList.reducer(state.getList, action),
    groupCatIDCatMap: groupCatIDCatMap.reducer(state.groupCatIDCatMap, action),
  }
}

export default reducer
