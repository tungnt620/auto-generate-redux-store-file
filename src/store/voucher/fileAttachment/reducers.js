import * as uploadAttachment from './slices/uploadAttachment'
import * as downloadAttachment from './slices/downloadAttachment'

const initialState = {
  uploadAttachment: uploadAttachment.initial,
  downloadAttachment: downloadAttachment.initial,
}

const reducer = (state = initialState, action) => {
  return {
    ...state,
    uploadAttachment: uploadAttachment.reducer(state.uploadAttachment, action),
    downloadAttachment: downloadAttachment.reducer(state.downloadAttachment, action),
  }
}

export default reducer
