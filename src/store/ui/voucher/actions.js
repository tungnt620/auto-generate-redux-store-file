import * as actionTypes from './actionTypes'

export const setVoucherUIConfig = (uiConfigs) => {
  return {
    type: actionTypes.UPDATE_VOUCHER_UI_CONFIG.success(),
    payload: uiConfigs
  }
}

export const resetVoucherUIConfig = () => {
  return {
    type: actionTypes.UPDATE_VOUCHER_UI_CONFIG.reset()
  }
}
