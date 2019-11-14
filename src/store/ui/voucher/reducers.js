import * as qaConfirm from './slices/qaConfirm'

const initialState = {
  qaConfirm: qaConfirm.initialState,
}

const reducer = (state = initialState, action) => {
  return {
    ...state,
    qaConfirm: qaConfirm.reducer(state.qaConfirm, action),
  }
}

export default reducer
