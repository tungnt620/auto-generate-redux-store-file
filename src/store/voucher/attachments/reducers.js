import * as upload from './slices/upload'
import * as massUpload from './slices/massUpload'
import * as download from './slices/download'

const initialState = {
  upload: upload.initial,
  massUpload: massUpload.initial,
  download: download.initial,
}

const reducer = (state = initialState, action) => {
  return {
    ...state,
    upload: upload.reducer(state.upload, action),
    massUpload: massUpload.reducer(state.massUpload, action),
    download: download.reducer(state.download, action),
  }
}

export default reducer
