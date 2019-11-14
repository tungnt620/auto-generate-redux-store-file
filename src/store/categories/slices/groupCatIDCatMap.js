import * as actionTypes from '../actionTypes'

export const initialState = {}

const addListCat = (state, payload) => {
  return {
    ...state,
    [payload.groupCatID]: payload.data.records || [],
  }
}

const reset = () => {
  return initialState
}

export const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.GET_LIST_CATEGORY.custom('addToGroupCatIDCatMap'):
      return addListCat(state, payload)
    case actionTypes.GET_LIST_CATEGORY.custom('resetToGroupCatIDCatMap'):
      return reset()
    default:
      return state
  }
}
