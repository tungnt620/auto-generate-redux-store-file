import * as getList from './slices/getList'

const initialState = {
  getList: getList.initialState,
}

const reducer = (state = initialState, action) => {
  return {
    ...state,
    getList: getList.reducer(state.getList, action),
  }
}

export default reducer
