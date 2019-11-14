import * as getListComments from './slices/getListComments'
import * as createComment from './slices/createComment'

const initialState = {
  getListComments: getListComments.initial,
  createComment: createComment.initial,
}

const reducer = (state = initialState, action) => {
  return {
    ...state,
    getListComments: getListComments.reducer(state.getListComments, action),
    createComment: createComment.reducer(state.createComment, action),
  }
}

export default reducer
