import * as getList from './slices/getList'
import * as detail from './slices/detail'
import * as massPromotionCheck from './slices/massPromotionCheck'

const initialState = {
  getList: getList.initial,
  detail: detail.initial,
  massPromotionCheck: massPromotionCheck.initial,
}

const reducer = (state = initialState, action) => {
  return {
    ...state,
    getList: getList.reducer(state.getList, action),
    detail: detail.reducer(state.detail, action),
    massPromotionCheck: massPromotionCheck.reducer(state.massPromotionCheck, action),
  }
}

export default reducer
