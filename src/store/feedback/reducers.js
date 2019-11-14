import * as message from './slices/message'

const initialState = {
  message: message.initialState,
}

const reducer = (state = initialState, action) => {
  return {
    ...state,
    message: message.reducer(state.message, action),
  }
}

export default reducer
