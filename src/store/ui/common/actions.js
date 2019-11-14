import * as actionTypes from './actionTypes'

export const setCommonUIConfig = (uiConfigs) => {
  return {
    type: actionTypes.UPDATE_UI_CONFIG.success(),
    payload: uiConfigs
  }
}

export const resetCommonUIConfig = () => {
  return {
    type: actionTypes.UPDATE_UI_CONFIG.reset()
  }
}
