import * as types from '../actionTypes'

export const initial = {
  loading: false,
  sbmIDCheckDataMap: {},
  error: null,
  code: null,
}

const start = (state) => {
  return {
    ...state,
    loading: true
  }
}

const success = (state, payload) => {
  const oldSbmIDCheckData = { ...state.sbmIDCheckDataMap}
  const sbmIDCheckDataMap = payload.data.reduce((map, sbm) => {
    map[sbm.submission_id] = sbm
    return map
  }, oldSbmIDCheckData)

  return {
    ...state,
    ...payload,
    sbmIDCheckDataMap,
    loading: false,
  }
}

const fail = (state, payload) => {
  return {
    ...state,
    ...payload,
    loading: false,
  }
}

const reset = () => {
  return initial
}

export const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case types.SUBMISSION_MASS_PROMOTION_CHECK.start():
      return start(state)
    case types.SUBMISSION_MASS_PROMOTION_CHECK.success():
      return success(state, payload)
    case types.SUBMISSION_MASS_PROMOTION_CHECK.fail():
      return fail(state, payload)
    case types.SUBMISSION_MASS_PROMOTION_CHECK.reset():
      return reset()
    default:
      return state
  }
}
